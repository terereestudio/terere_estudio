// POST /api/crear-pago
// Crea una preferencia de Checkout Pro y devuelve la URL donde el cliente paga.
// Body JSON: { "plan": "emprendedor", "moneda": "ars" | "usd" }

import { randomBytes } from 'node:crypto';
import { PLANES, montoEnArs } from '../lib/precios.mjs';

const json = (status, cuerpo) =>
  new Response(JSON.stringify(cuerpo), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'Método no permitido' });

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    console.error('crear-pago: falta la variable MP_ACCESS_TOKEN');
    return json(500, { error: 'No pudimos iniciar el pago. Escribinos por WhatsApp.' });
  }

  let datos;
  try {
    datos = await req.json();
  } catch {
    return json(400, { error: 'Datos inválidos' });
  }

  const plan = String(datos?.plan ?? '');
  const moneda = String(datos?.moneda ?? '');
  const monto = montoEnArs(plan, moneda);
  if (monto === null || !PLANES[plan]) return json(400, { error: 'Datos inválidos' });

  // Base pública del sitio. En un deploy de rama, DEPLOY_PRIME_URL es la URL de esa rama.
  const base = process.env.DEPLOY_PRIME_URL || process.env.URL;
  if (!base) return json(500, { error: 'No pudimos iniciar el pago. Escribinos por WhatsApp.' });

  const referencia = `TE-${plan}-${Date.now()}-${randomBytes(3).toString('hex')}`;

  const cuerpo = {
    items: [
      {
        id: plan,
        title: `${PLANES[plan].titulo} - Tereré Estudio`,
        quantity: 1,
        currency_id: 'ARS',
        unit_price: monto,
      },
    ],
    external_reference: referencia,
    back_urls: {
      success: `${base}/pago-recibido.html?estado=aprobado`,
      pending: `${base}/pago-recibido.html?estado=pendiente`,
      failure: `${base}/pago-recibido.html?estado=rechazado`,
    },
    auto_return: 'approved',
    notification_url: `${base}/api/notificacion-pago`,
  };

  let respuesta;
  try {
    respuesta = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuerpo),
    });
  } catch (err) {
    console.error('crear-pago: error de red con Mercado Pago', err);
    return json(502, { error: 'No pudimos iniciar el pago. Escribinos por WhatsApp.' });
  }

  const datosMP = await respuesta.json().catch(() => null);
  if (!respuesta.ok || !datosMP) {
    console.error('crear-pago: Mercado Pago respondió', respuesta.status, JSON.stringify(datosMP));
    return json(502, { error: 'No pudimos iniciar el pago. Escribinos por WhatsApp.' });
  }

  // Con credenciales de prueba (TEST-...) se usa la URL de sandbox.
  const url = token.startsWith('TEST-') ? datosMP.sandbox_init_point : datosMP.init_point;
  if (!url) {
    console.error('crear-pago: la respuesta no trae URL de pago', JSON.stringify(datosMP));
    return json(502, { error: 'No pudimos iniciar el pago. Escribinos por WhatsApp.' });
  }

  return json(200, { url, referencia });
};

export const config = { path: '/api/crear-pago' };
