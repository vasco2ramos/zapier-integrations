var github = require('../integrations/github.js')


module.exports = function(app){

  app.post('github/close', function(req, res){
    if(!req.body.number){
      console.log(req.body);
      return
    }

    github.closeIssue(req.body.number);
  });


}
