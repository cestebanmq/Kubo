const MesaModel = {
  /**
   * Devuelve un arreglo con todas las mesas (id y nombre)
   */
  listarMesas: function () {
    const sheet = SpreadsheetApp.getActive().getSheetByName('Mesas');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idxId = headers.indexOf('mesaID');
    const idxNombre = headers.indexOf('nombre');
    const mesas = [];
    for (let i = 1; i < data.length; i++) {
      mesas.push({
        id: data[i][idxId],
        nombre: idxNombre !== -1 ? data[i][idxNombre] : data[i][idxId]
      });
    }
    return mesas;
  },

  /**
   * Devuelve los enlaces (propios y generales) para una mesa, ordenados por peso
   */
  getMesaLinks: function (mesaID) {
    const ss = SpreadsheetApp.getActive();
    // 1. Obtener enlaces generales activos
    const enlacesSheet = ss.getSheetByName('Enlaces');
    const enlacesData = enlacesSheet.getDataRange().getValues();
    const enlacesHeaders = enlacesData[0];
    const idxEnlaceID = enlacesHeaders.indexOf('enlaceID');
    const idxTipo = enlacesHeaders.indexOf('tipo');
    const idxActivo = enlacesHeaders.indexOf('activo');
    const idxPeso = enlacesHeaders.indexOf('peso');
    const idxIcono = enlacesHeaders.indexOf('icono');
    
    // 2. Obtener enlaces propios de la mesa
    const mesaEnlacesSheet = ss.getSheetByName('MesaEnlaces');
    const mesaEnlacesData = mesaEnlacesSheet.getDataRange().getValues();
    const mesaEnlacesHeaders = mesaEnlacesData[0];
    const idxMesaID = mesaEnlacesHeaders.indexOf('mesaID');
    const idxMesaEnlaceID = mesaEnlacesHeaders.indexOf('enlaceID');

    // IDs de enlaces propios de la mesa
    const propiosIDs = mesaEnlacesData
      .filter((row, i) => i > 0 && row[idxMesaID] == mesaID)
      .map(row => row[idxMesaEnlaceID]);

    // 3. Filtrar enlaces generales activos y propios
    let enlaces = [];
    for (let i = 1; i < enlacesData.length; i++) {
      const row = enlacesData[i];
      const tipo = row[idxTipo];
      const activo = String(row[idxActivo]).toLowerCase() === 'true';
      const id = row[idxEnlaceID];
      if (!activo) continue;
      if (
        (tipo === 'general') ||
        (tipo === 'mesa' && propiosIDs.includes(id))
      ) {
        // Construir objeto enlace con campos relevantes
        const enlace = {};
        enlacesHeaders.forEach((h, j) => enlace[h] = row[j]);
        enlaces.push(enlace);
      }
    }
    // 4. Ordenar por peso (ascendente, si existe)
    enlaces.sort((a, b) => {
      const pesoA = parseInt(a.peso) || 0;
      const pesoB = parseInt(b.peso) || 0;
      return pesoA - pesoB;
    });
    return enlaces;
  }
};
