var express = require("express");
var bodyParser = require("body-parser");
var github = require('octonode');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
  res.send('This app is working');
});

app.post('/close', function(req, res){

    var client = github.client(process.env.GITHUB_KEY);
    var ghissue = client.issue(process.env.ISSUES_REPO, req.body.number);

    ghissue.update({
        "state": "closed",
    }, function(){
        res.send('It is Working!');
    });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
