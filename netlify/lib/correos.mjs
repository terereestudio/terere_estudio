// Correos que se mandan cuando un pago queda aprobado:
// 1. aviso para Leonardo, con todos los datos del pago y del cliente;
// 2. agradecimiento para el cliente, con el resumen y los próximos pasos.
// Son HTML con estilos en línea (los programas de correo no aceptan hojas de estilo).

const SITIO = 'https://terereestudio.com.ar';
const WA = '5493644328260';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const pesos = (n, moneda = 'ARS') => new Intl.NumberFormat('es-AR', { style: 'currency', currency: moneda }).format(n ?? 0);
const fecha = (iso) => {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'long', timeStyle: 'short', timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date(iso));
  } catch { return iso; }
};
const MEDIOS = { account_money: 'Dinero en cuenta de Mercado Pago', credit_card: 'Tarjeta de crédito', debit_card: 'Tarjeta de débito', prepaid_card: 'Tarjeta prepaga', ticket: 'Efectivo (Rapipago / Pago Fácil)', bank_transfer: 'Transferencia', digital_currency: 'Cuotas sin tarjeta', digital_wallet: 'Billetera virtual' };
const medioDePago = (p) => {
  const tipo = MEDIOS[p.payment_type_id] || p.payment_type_id || '';
  const marca = p.payment_method_id && !['account_money', 'consumer_credits'].includes(p.payment_method_id) ? ` (${p.payment_method_id.toUpperCase()})` : '';
  const cuotas = p.installments > 1 ? ` · ${p.installments} cuotas` : '';
  return `${tipo}${marca}${cuotas}`.trim();
};
const soloNumeros = (s) => String(s || '').replace(/\D/g, '');
// WhatsApp de Argentina escrito como "3794 123456" → 5493794123456
const linkWhatsApp = (tel, texto) => {
  let n = soloNumeros(tel);
  if (!n) return '';
  if (!n.startsWith('54')) n = '549' + n.replace(/^0/, '').replace(/^15/, '');
  return `https://wa.me/${n}?text=${encodeURIComponent(texto)}`;
};

// Datos del pago y del cliente, juntando lo que manda Mercado Pago con lo que el cliente cargó en la página
export function datosDelPago(pago, planes) {
  const m = pago.metadata || {};
  const plan = planes[m.plan] || Object.values(planes).find((p) => (pago.description || '').startsWith(p.titulo)) || null;
  const nombreMP = [pago.payer?.first_name, pago.payer?.last_name].filter(Boolean).join(' ');
  return {
    id: pago.id,
    referencia: pago.external_reference || '',
    plan,
    planTitulo: plan?.titulo || pago.description || 'Plan',
    monto: pesos(pago.transaction_amount, pago.currency_id || 'ARS'),
    fecha: fecha(pago.date_approved || pago.date_created),
    medio: medioDePago(pago),
    nombre: (m.nombre || nombreMP || '').trim(),
    primerNombre: ((m.nombre || pago.payer?.first_name || '').trim().split(/\s+/)[0]) || '',
    rubro: (m.rubro || '').trim(),
    idea: (m.idea || '').trim(),
    whatsapp: (m.whatsapp || '').trim(),
    idioma: m.idioma || 'es',
    email: pago.payer?.email || '',
    nombreMP,
    documento: pago.payer?.identification?.number ? `${pago.payer.identification.type || ''} ${pago.payer.identification.number}`.trim() : '',
  };
}

const fila = (k, v) => v ? `<tr><td style="padding:8px 12px 8px 0;color:#6B6460;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;color:#231F20;font-size:15px;vertical-align:top">${v}</td></tr>` : '';
const boton = (href, texto, fondo = '#9FBD2B', color = '#161415') => `<a href="${esc(href)}" style="display:inline-block;background:${fondo};color:${color};text-decoration:none;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px">${esc(texto)}</a>`;
const marco = (contenido, pre = '') => `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#EFEBE4;font-family:Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(pre)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EFEBE4"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFFFFF;border-radius:16px;overflow:hidden">
${contenido}
</table>
<p style="margin:16px 0 0;color:#8A837D;font-size:12px;line-height:1.5">Tereré Estudio · Corrientes, Argentina · <a href="${SITIO}" style="color:#8A837D">terereestudio.com.ar</a></p>
</td></tr></table></body></html>`;

// 1. Aviso para Leonardo
export function avisoInterno(d, estadoCorreoCliente) {
  const waCliente = linkWhatsApp(d.whatsapp, `Hola ${d.primerNombre || ''}, soy Leonardo de Tereré Estudio. Recibí tu pago del ${d.planTitulo}. ¡Arrancamos!`.replace('Hola ,', 'Hola,'));
  const contenido = `
<tr><td style="background:#161415;padding:22px 28px"><p style="margin:0;color:#9FBD2B;font:600 13px 'Courier New',monospace">// pago aprobado</p>
<h1 style="margin:6px 0 0;color:#F3E9DA;font-size:26px;line-height:1.2">${esc(d.planTitulo)} · ${esc(d.monto)}</h1>
<p style="margin:6px 0 0;color:#CFC8BC;font-size:15px">${esc(d.nombre || d.email || 'Cliente sin nombre')}</p></td></tr>
<tr><td style="padding:22px 28px 6px"><h2 style="margin:0 0 6px;font-size:16px;color:#231F20">El cliente</h2>
<table role="presentation" cellpadding="0" cellspacing="0">
${fila('Nombre', esc(d.nombre))}${fila('Negocio o rubro', esc(d.rubro))}${fila('Su idea', esc(d.idea).replace(/\n/g, '<br>'))}
${fila('WhatsApp', d.whatsapp ? `${esc(d.whatsapp)}${waCliente ? ` · <a href="${esc(waCliente)}" style="color:#4A7A00">escribirle</a>` : ''}` : '<span style="color:#8A837D">no lo cargó</span>')}
${fila('Correo', d.email ? `<a href="mailto:${esc(d.email)}" style="color:#4A7A00">${esc(d.email)}</a>` : '')}
${fila('Nombre en Mercado Pago', d.nombreMP && d.nombreMP !== d.nombre ? esc(d.nombreMP) : '')}${fila('Documento', esc(d.documento))}
${fila('Idioma de la página', d.idioma && d.idioma !== 'es' ? esc(d.idioma.toUpperCase()) : '')}
</table></td></tr>
<tr><td style="padding:14px 28px 6px"><h2 style="margin:0 0 6px;font-size:16px;color:#231F20">El pago</h2>
<table role="presentation" cellpadding="0" cellspacing="0">
${fila('Plan', esc(d.planTitulo))}${fila('Monto', `<strong>${esc(d.monto)}</strong>`)}${fila('Fecha', esc(d.fecha))}${fila('Medio', esc(d.medio))}
${fila('Referencia', esc(d.referencia))}${fila('ID de pago', esc(d.id))}
</table></td></tr>
<tr><td style="padding:18px 28px 8px">${waCliente ? boton(waCliente, 'Escribirle por WhatsApp →') + '&nbsp; ' : ''}${d.email ? boton(`mailto:${d.email}`, 'Responderle por correo', '#EFEBE4', '#231F20') : ''}</td></tr>
<tr><td style="padding:10px 28px 24px"><p style="margin:0;color:#6B6460;font-size:13px;line-height:1.5">Correo de agradecimiento al cliente: ${esc(estadoCorreoCliente)}</p></td></tr>`;
  const texto = [`Pago aprobado: ${d.planTitulo} · ${d.monto}`, '', `Nombre: ${d.nombre}`, `Rubro: ${d.rubro}`, `Idea: ${d.idea}`, `WhatsApp: ${d.whatsapp || '(no lo cargó)'}`, `Correo: ${d.email}`, '', `Fecha: ${d.fecha}`, `Medio: ${d.medio}`, `Referencia: ${d.referencia}`, `ID de pago: ${d.id}`, '', `Correo al cliente: ${estadoCorreoCliente}`].join('\n');
  return { subject: `Nuevo pago: ${d.planTitulo} · ${d.monto}${d.nombre ? ' · ' + d.nombre : ''}`, html: marco(contenido, `${d.nombre || 'Un cliente'} pagó el ${d.planTitulo}`), text: texto };
}

// 2. Agradecimiento para el cliente
export function agradecimiento(d) {
  const p = d.plan || {};
  const waTexto = `Hola Leonardo, acabo de pagar el ${d.planTitulo} (referencia ${d.referencia}). ¡Arrancamos!`;
  const pasos = [
    ['Te escribo por WhatsApp', 'Dentro de las próximas 24 horas hábiles te escribo para coordinar. Si querés adelantarte, escribime vos con el botón de abajo.'],
    ['Me pasás tu material', 'Logo, fotos, textos y lo que quieras mostrar. Si no tenés algo, lo armamos juntos.'],
    ['Diseño y revisamos juntos', 'Te muestro la propuesta y ajustamos textos, fotos y detalles hasta que te represente.'],
    ['Publicamos', `Tu página queda en línea con tu dominio. Entrega estimada: ${p.entrega || 'la coordinamos juntos'}.`],
  ];
  const contenido = `
<tr><td><img src="${SITIO}/img/email/gracias.jpg" width="600" alt="¡Gracias por tu compra! Tu proyecto ya está en marcha." style="display:block;width:100%;height:auto;border:0"></td></tr>
<tr><td style="padding:28px 28px 8px">
<h1 style="margin:0;color:#161415;font-size:24px;line-height:1.25">${d.primerNombre ? `¡Gracias, ${esc(d.primerNombre)}!` : '¡Gracias por tu compra!'}</h1>
<p style="margin:12px 0 0;color:#3A3536;font-size:16px;line-height:1.55">Recibimos tu pago del <strong>${esc(d.planTitulo)}</strong>. Gracias por confiar en Tereré Estudio: desde ahora tu proyecto está en marcha y lo vamos a hacer juntos, paso a paso.</p>
</td></tr>
<tr><td style="padding:16px 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F3EE;border-radius:12px"><tr><td style="padding:16px 18px">
<p style="margin:0 0 8px;color:#6B6460;font:600 12px 'Courier New',monospace;letter-spacing:.04em">RESUMEN DE TU COMPRA</p>
<table role="presentation" cellpadding="0" cellspacing="0">${fila('Plan', esc(d.planTitulo))}${fila('Monto', `<strong>${esc(d.monto)}</strong>`)}${fila('Fecha', esc(d.fecha))}${fila('Medio de pago', esc(d.medio))}${fila('Referencia', esc(d.referencia))}${p.cuota ? fila('Cuota mensual', `${esc(p.cuota)} <span style="color:#6B6460">(la coordinamos juntos)</span>`) : ''}</table>
</td></tr></table></td></tr>
${p.incluye?.length ? `<tr><td style="padding:8px 28px"><h2 style="margin:0 0 8px;font-size:17px;color:#161415">Qué incluye tu plan</h2>
<table role="presentation" cellpadding="0" cellspacing="0">${p.incluye.map((x) => `<tr><td style="padding:4px 10px 4px 0;color:#7FA012;font-size:15px;vertical-align:top">✓</td><td style="padding:4px 0;color:#3A3536;font-size:15px;line-height:1.45">${esc(x)}</td></tr>`).join('')}</table></td></tr>` : ''}
<tr><td style="padding:16px 28px 4px"><h2 style="margin:0 0 10px;font-size:17px;color:#161415">Cómo seguimos</h2>
<table role="presentation" cellpadding="0" cellspacing="0">${pasos.map(([t, x], i) => `<tr><td style="padding:6px 14px 10px 0;vertical-align:top"><div style="width:30px;height:30px;line-height:30px;border-radius:50%;background:#161415;color:#9FBD2B;text-align:center;font:700 14px 'Courier New',monospace">0${i + 1}</div></td><td style="padding:6px 0 10px;vertical-align:top"><p style="margin:0;color:#161415;font-size:15px;font-weight:700">${esc(t)}</p><p style="margin:3px 0 0;color:#4A4445;font-size:14px;line-height:1.5">${esc(x)}</p></td></tr>`).join('')}</table></td></tr>
<tr><td align="center" style="padding:14px 28px 26px">${boton(`https://wa.me/${WA}?text=${encodeURIComponent(waTexto)}`, 'Escribime por WhatsApp →')}</td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #ECE7E0"><p style="margin:0;color:#6B6460;font-size:13px;line-height:1.55">Guardá este correo: tiene tu número de referencia. El comprobante oficial del pago te lo manda Mercado Pago por separado. Cualquier duda, respondé este correo o escribime por WhatsApp al +54 9 3644 32-8260.</p>
<p style="margin:12px 0 0;color:#161415;font-size:14px">Leonardo Lavrovic<br><span style="color:#6B6460">Tereré Estudio</span></p></td></tr>`;
  const texto = [`¡Gracias por tu compra${d.primerNombre ? ', ' + d.primerNombre : ''}!`, '', `Recibimos tu pago del ${d.planTitulo} (${d.monto}). Referencia: ${d.referencia}.`, '', 'Cómo seguimos:', ...pasos.map(([t, x], i) => `${i + 1}. ${t}: ${x}`), '', `WhatsApp: https://wa.me/${WA}`, '', 'Leonardo Lavrovic · Tereré Estudio'].join('\n');
  return { subject: `¡Gracias por tu compra${d.primerNombre ? ', ' + d.primerNombre : ''}! · Tereré Estudio`, html: marco(contenido, `Recibimos tu pago del ${d.planTitulo}. Te cuento cómo seguimos.`), text: texto };
}
