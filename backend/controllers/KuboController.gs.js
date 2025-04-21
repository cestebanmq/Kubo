const KuboController = {
  /**
   * Renderiza la página HTML para una mesa (compatibilidad)
   */

  /**
   * API REST: Retorna la lista de mesas en JSON
   * GET /?endpoint=mesas
   */
  apiListarMesas: function () {
    try {
      const mesas = MesaModel.listarMesas();
      return ContentService.createTextOutput(JSON.stringify(mesas))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  },

  /**
   * API REST: Devuelve la configuración solicitada
   * GET /?endpoint=configuracion&clave=mensaje_bienvenida
   */
  apiConfiguracion: function(clave) {
    try {
      if (!clave) {
        return ContentService.createTextOutput(JSON.stringify({ error: 'Falta parámetro clave' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      const valor = ConfigModel.getConfig(clave);
      return ContentService.createTextOutput(JSON.stringify({ clave, valor }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  },

  /**
   * API REST: Retorna los enlaces de una mesa en JSON
   * GET /?endpoint=enlaces&mesa=ID
   */
  apiEnlacesPorMesa: function (mesaID) {
    try {
      if (!mesaID) {
        return ContentService.createTextOutput(JSON.stringify({ error: 'Falta parámetro mesa' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      const enlaces = MesaModel.getMesaLinks(mesaID);
      return ContentService.createTextOutput(JSON.stringify(enlaces))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
};
