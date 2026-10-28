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

  // Por ahora solo queda registrado en los logs de Netlify.
  // Falta definir el canal para avisarte (correo o WhatsApp); ver la nota en el documento de precios.
  console.log(
    'pago',
    JSON.stringify({
      id: pago.id,
      estado: pago.status,
      detalle: pago.status_detail,
      referencia: pago.external_reference,
      monto: pago.transaction_amount,
      moneda: pago.currency_id,
    }),
  );

  return new Response('ok', { status: 200 });
};

export const config = { path: '/api/notificacion-pago' };
