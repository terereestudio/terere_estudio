// Precios de los planes que se pueden contratar con Mercado Pago.
// El servidor define el monto: el navegador solo indica el plan y la moneda que vio.
// Mantener alineado con src/paginas/index.html y la tabla de precios del proyecto.

export const TIPO_DE_CAMBIO = 1500; // ARS por USD, referencia fija

export const PLANES = {
  base: { titulo: 'Plan Base', ars: 150000, usd: 100 },
  emprendedor: { titulo: 'Plan Catálogo', ars: 100000, usd: 70 },
  servicios: { titulo: 'Plan Servicios', ars: 100000, usd: 70 },
  // TEMPORAL (31 oct 2026): pago de prueba de $200 para verificar Mercado Pago en producción.
  // No aparece en la página. Borrar después de la prueba.
  prueba: { titulo: 'Prueba de pago', ars: 200, usd: null },
};

// Devuelve el monto en pesos que se cobra en Mercado Pago, o null si el pedido no es válido.
export function montoEnArs(plan, moneda) {
  const p = PLANES[plan];
  if (!p) return null;
  if (moneda === 'ars') return p.ars;
  if (moneda === 'usd') return p.usd ? p.usd * TIPO_DE_CAMBIO : null;
  return null;
}
