// Precios de los planes que se pueden contratar con Mercado Pago.
// El servidor define el monto: el navegador solo indica el plan y la moneda que vio.
// Mantener alineado con src/paginas/index.html y la tabla de precios del proyecto.

export const TIPO_DE_CAMBIO = 1500; // ARS por USD, referencia fija

export const PLANES = {
  base: {
    titulo: 'Plan Base', ars: 150000, usd: 100,
    entrega: 'en el día o, como máximo, en dos días hábiles',
    incluye: ['Diseño a medida de tu página, en código puro', 'Versión para celular y computadora', 'Dominio y hosting por un año', 'Certificado de seguridad (HTTPS)', 'Botón de WhatsApp y SEO básico', 'Cambios y ajustes durante el primer mes'],
  },
  emprendedor: {
    titulo: 'Plan Catálogo', ars: 100000, usd: 70, cuota: '$15.000 por mes',
    entrega: 'alrededor de diez días hábiles, según la cantidad de productos',
    incluye: ['Catálogo con fotos, precios y variantes (talle, color)', 'Carrito que arma el pedido', 'El pedido te llega armado por WhatsApp', 'Carga, edición y baja de productos cada mes', 'Productos agotados y banners de temporada'],
  },
  servicios: {
    titulo: 'Plan Servicios', ars: 100000, usd: 70, cuota: '$15.000 por mes',
    entrega: 'alrededor de dos días hábiles',
    incluye: ['Página con tus servicios y precios', 'Reserva de turnos online por día y horario', 'Panel para ver y gestionar tus turnos', 'Aviso del turno por WhatsApp', 'Mantenimiento mensual'],
  },
  // TEMPORAL (31 oct 2026): pago de prueba de $200 para verificar Mercado Pago en producción.
  // No aparece en la página. Borrar después de la prueba.
  prueba: { titulo: 'Prueba de pago', ars: 200, usd: null, entrega: 'esto es una prueba', incluye: ['Verificar que el cobro funciona', 'Verificar los correos de aviso y de agradecimiento'] },
};

// Devuelve el monto en pesos que se cobra en Mercado Pago, o null si el pedido no es válido.
export function montoEnArs(plan, moneda) {
  const p = PLANES[plan];
  if (!p) return null;
  if (moneda === 'ars') return p.ars;
  if (moneda === 'usd') return p.usd ? p.usd * TIPO_DE_CAMBIO : null;
  return null;
}
