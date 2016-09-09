var hiveage = require('../integrations/hiveage.js')



module.exports = function(app){
  app.get('/hiveage', function(req, res){
      hiveage.getConnection("sourced", console.log);
  });

}
