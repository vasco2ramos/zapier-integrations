var invoices = require('../middleware/invoices.js')



module.exports = function(app){
  app.get('/hiveage', function(req, res){
    res.send('Yeah this route definitely exists!');
      //hiveage.getConnection("Sourced", console.log);
  });

  app.get('/hiveage/newinvoice', function(req, res){
    console.log(req);
    //hiveage.startInvoices(req);
  });

}
