var hiveage = require('./integrations/hiveage.js')

app.post('hiveage/new', function(req, res){

    if(!req.body.number){
        console.log(req.body);
        return
    }

    github.closeIssue(req.body.number);

});
