// POST /api/notificacion-pago
// Mercado Pago avisa cuando se crea o cambia un pago. No confiamos en el aviso:
// con el id del pago consultamos la API y recién ahí actuamos.
// Con el pago aprobado se mandan dos correos (con Resend):
//   1. a Leonardo (AVISOS_EMAIL), con todos los datos del pago y del cliente;
//   2. al cliente, un agradecimiento con el resumen y los próximos pasos.
// El correo al cliente solo sale si hay un remitente con dominio verificado en Resend
// (variable AVISOS_REMITENTE, por ejemplo "Tereré Estudio <hola@terereestudio.com.ar>").
// Mercado Pago puede avisar varias veces del mismo pago: se registra en Netlify Blobs
// para mandar los correos una sola vez.

import { PLANES } from '../lib/precios.mjs';
import { datosDelPago, avisoInterno, agradecimiento } from '../lib/correos.mjs';

export default async (req) => {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    console.error('notificacion-pago: falta la variable MP_ACCESS_TOKEN');
    return new Response('error', { status: 500 });
  }

  const url = new URL(req.url);
  let cuerpo = null;
  try { cuerpo = await req.json(); } catch { /* puede venir solo por query string */ }

  const tipo = cuerpo?.type ?? url.searchParams.get('type');
  const id = cuerpo?.data?.id ?? url.searchParams.get('data.id');
  // Respondemos 200 a todo lo que no sea un pago, para que Mercado Pago no reintente sin sentido.
  if (tipo !== 'payment' || !id) return new Response('ok', { status: 200 });

  let pago;
  try {
    const r = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) {
      console.error('notificacion-pago: no se pudo consultar el pago', id, r.status);
      return new Response('retry', { status: 500 }); // Mercado Pago reintenta
    }
    pago = await r.json();
  } catch (err) {
    console.error('notificacion-pago: error de red', id, err);
    return new Response('retry', { status: 500 });
  }

  console.log('pago', JSON.stringify({ id: pago.id, estado: pago.status, referencia: pago.external_reference, monto: pago.transaction_amount }));
  if (pago.status !== 'approved') return new Response('ok', { status: 200 });

  // Una sola vez por pago
  const registro = await registroDePagos();
  const clave = `aprobado-${pago.id}`;
  if (registro) {
    try {
      if (await registro.get(clave)) return new Response('ok', { status: 200 });
      await registro.set(clave, new Date().toISOString());
    } catch (err) { console.error('notificacion-pago: no se pudo usar el registro de pagos', err); }
  }

  const d = datosDelPago(pago, PLANES);
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.AVISOS_EMAIL;
  const remitenteVerificado = process.env.AVISOS_REMITENTE;
  const remitente = remitenteVerificado || 'Tereré Estudio <onboarding@resend.dev>';
  if (!apiKey || !destino) {
    console.error('notificacion-pago: faltan RESEND_API_KEY o AVISOS_EMAIL; no se enviaron los correos');
    return new Response('ok', { status: 200 });
  }

  // 2. Agradecimiento al cliente (primero, para poder contar en el aviso si salió)
  let estadoCliente;
  if (!d.email) estadoCliente = 'no se envió: Mercado Pago no informó el correo del cliente.';
  else if (!remitenteVerificado) estadoCliente = `no se envió a ${d.email}: falta verificar el dominio terereestudio.com.ar en Resend y cargar AVISOS_REMITENTE en Netlify.`;
  else {
    const c = agradecimiento(d);
    const ok = await enviar(apiKey, { from: remitente, to: [d.email], reply_to: destino, subject: c.subject, html: c.html, text: c.text });
    estadoCliente = ok ? `enviado a ${d.email}.` : `falló el envío a ${d.email} (ver registros de Netlify).`;
  }

  // 1. Aviso para Leonardo
  const a = avisoInterno(d, estadoCliente);
  await enviar(apiKey, { from: remitente, to: [destino], reply_to: d.email || undefined, subject: a.subject, html: a.html, text: a.text });

  return new Response('ok', { status: 200 });
};

async function registroDePagos() {
  try {
    const { getStore } = await import('@netlify/blobs');
    return getStore('pagos');
  } catch { return null; }
}

async function enviar(apiKey, correo) {
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(correo),
    });
    if (!r.ok) { console.error('notificacion-pago: Resend respondió', r.status, await r.text()); return false; }
    return true;
  } catch (err) {
    console.error('notificacion-pago: error al enviar el correo', err);
    return false;
  }
}

export const config = { path: '/api/notificacion-pago' };
