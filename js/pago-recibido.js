// Página de retorno de Mercado Pago: muestra el mensaje según el estado que llega en la URL.
// Solo es informativo: el pago se confirma en el servidor con la notificación de Mercado Pago.
(() => {
  const params = new URLSearchParams(location.search);
  const permitidos = ['aprobado', 'pendiente', 'rechazado'];
  const estado = permitidos.includes(params.get('estado')) ? params.get('estado') : 'desconocido';

  document.querySelectorAll('.pago-estado [data-estado]').forEach((bloque) => {
    bloque.hidden = bloque.dataset.estado !== estado;
  });

  const referencia = params.get('external_reference');
  const pagoId = params.get('payment_id');
  if (referencia && /^[A-Za-z0-9-]{1,64}$/.test(referencia)) {
    const p = document.getElementById('pago-referencia');
    p.textContent = `Referencia: ${referencia}`;
    p.hidden = false;

    const textos = {
      aprobado: `Hola Leonardo, acabo de pagar en Tereré Estudio. Referencia: ${referencia}${pagoId ? ` (pago ${pagoId})` : ''}.`,
      pendiente: `Hola Leonardo, hice un pago que figura pendiente. Referencia: ${referencia}.`,
      rechazado: `Hola Leonardo, intenté pagar pero no se pudo completar. Referencia: ${referencia}.`,
    };
    const texto = textos[estado] || `Hola Leonardo, tengo una consulta sobre mi pago. Referencia: ${referencia}.`;
    document.getElementById('pago-whatsapp').href = `https://wa.me/543644328260?text=${encodeURIComponent(texto)}`;
  }
})();
