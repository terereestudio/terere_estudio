// POST /api/notificacion-pago
// Mercado Pago avisa cuando se crea o cambia un pago. No confiamos en el aviso:
// con el id del pago consultamos la API y recién ahí registramos el resultado.

export default async (req) => {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    console.error('notificacion-pago: falta la variable MP_ACCESS_TOKEN');
    return new Response('error', { status: 500 });
  }

  const url = new URL(req.url);
  let cuerpo = null;
  try {
    cuerpo = await req.json();
  } catch {
    // Puede venir solo por query string; se revisa abajo.
  }

  const tipo = cuerpo?.type ?? url.searchParams.get('type');
  const id = cuerpo?.data?.id ?? url.searchParams.get('data.id');

  // Respondemos 200 a todo lo que no sea un pago, para que Mercado Pago no reintente sin sentido.
  if (tipo !== 'payment' || !id) return new Response('ok', { status: 200 });

  let pago;
  try {
    const r = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) {
      console.error('notificacion-pago: no se pudo consultar el pago', id, r.status);
      return new Response('retry', { status: 500 }); // Mercado Pago reintenta
    }
    pago = await r.json();
  } catch (err) {
    console.error('notificacion-pago: error de red', id, err);
    return new Response('retry', { status: 500 });
  }

  const resumen = {
    id: pago.id,
    estado: pago.status,
    detalle: pago.status_detail,
    referencia: pago.external_reference,
    monto: pago.transaction_amount,
    moneda: pago.currency_id,
  };
  console.log('pago', JSON.stringify(resumen));

  if (pago.status === 'approved') {
    await avisarPorCorreo(resumen, pago.payer?.email);
  }

  return new Response('ok', { status: 200 });
};

// Aviso por correo con Resend. Si falla, no reintentamos el webhook: el pago ya quedó registrado en los logs.
async function avisarPorCorreo(resumen, emailCliente) {
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.AVISOS_EMAIL;
  const remitente = process.env.AVISOS_REMITENTE || 'Tereré Estudio <onboarding@resend.dev>';
  if (!apiKey || !destino) {
    console.error('notificacion-pago: faltan RESEND_API_KEY o AVISOS_EMAIL; no se envió el aviso');
    return;
  }

  const monto = new Intl.NumberFormat('es-AR', { style: 'currency', currency: resumen.moneda || 'ARS' }).format(
    resumen.monto ?? 0,
  );
  const texto = [
    'Pago aprobado en Mercado Pago.',
    '',
    `Referencia: ${resumen.referencia ?? '(sin referencia)'}`,
    `Monto: ${monto}`,
    `ID de pago: ${resumen.id}`,
    emailCliente ? `Correo del cliente: ${emailCliente}` : '',
  ]
    .filter((linea) => linea !== '')
    .join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: remitente,
        to: [destino],
        subject: `Pago aprobado: ${resumen.referencia ?? resumen.id}`,
        text: texto,
      }),
    });
    if (!r.ok) console.error('notificacion-pago: Resend respondió', r.status, await r.text());
  } catch (err) {
    console.error('notificacion-pago: error al enviar el correo', err);
  }
}

export const config = { path: '/api/notificacion-pago' };
