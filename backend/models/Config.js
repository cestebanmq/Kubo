const ConfigModel = {
  getConfig: function(clave) {
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName('Configuraciones');
    if (!sheet) throw new Error("No existe la hoja 'Configuraciones'");
    const data = sheet.getDataRange().getValues();
    const idxClave = data[0].indexOf('clave');
    const idxValor = data[0].indexOf('valor');
    for (let i = 1; i < data.length; i++) {
      if (data[i][idxClave] === clave) {
        return data[i][idxValor];
      }
    }
    return null;
  }
};
