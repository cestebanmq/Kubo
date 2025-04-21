/**
 * Router principal para exponer endpoints REST y render HTML
 * Endpoints:
 *   GET /mesas                  => lista de mesas (JSON)
 *   GET /enlaces?mesa=ID        => enlaces de una mesa (JSON)
 *   GET /?mesaID=ID             => render HTML (compatibilidad)
 */
const Router = {
  route: function (e) {
    const path = (e.parameter.endpoint || '').toLowerCase();
    const mesaID = e.parameter.mesaID || e.parameter.mesa || null;

    // Endpoint: /mesas
    if (path === 'mesas') {
      return KuboController.apiListarMesas();
    }
    // Endpoint: /enlaces?mesa=ID
    if (path === 'enlaces' && mesaID) {
      return KuboController.apiEnlacesPorMesa(mesaID);
    }
    // Endpoint: /configuracion?clave=...
    if (path === 'configuracion' && e.parameter.clave) {
      return KuboController.apiConfiguracion(e.parameter.clave);
    }
    // Endpoint no válido: responder SIEMPRE JSON
    return ContentService.createTextOutput(JSON.stringify({ error: 'Endpoint no válido' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
};
