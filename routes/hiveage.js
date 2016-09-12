var hiveage = require('../integrations/hiveage.js')



module.exports = function(app){
  app.get('/hiveage', function(req, res){
      hiveage.getConnection("Sourced", console.log);
  });

  app.get('/hiveage/newinvoice', function(req, res){
      hiveage.newInvoice(744934, 500, console.log);
  });

}
