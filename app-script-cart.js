function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var mail = e.parameter.mail;
  var ong = e.parameter.ong;
  var monto = e.parameter.monto;

  var newRow = [mail, ong, new Date(), monto];
  sheet.appendRow(newRow);

  return ContentService.createTextOutput("Datos añadidos con éxito");
}
