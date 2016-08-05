var hiveage = require('./integrations/hiveage.js')

app.post('github/close', function(req, res){

    if(!req.body.number){
        console.log(req.body);
        return
    }

    github.closeIssue(req.body.number);

});
