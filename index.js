var express = require("express");
var app = express();


var github = require('octonode');


app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/testing', function(req, res){
    var client = github.client(process.env.GITHUB_KEY);
    // HACK - not hardcoded please
    var ghissue = client.issue('vasco2ramos/mr-burns', 2);

    ghissue.update({
        "state": "closed",
    }, function(){
        res.send('It is Working!');
    });
});


app.post('/close', function(req, res){
    var timestamp = req.body.time_ms;
    var events = req.body.events;


    var client = github.client(process.env.GITHUB_KEY);
    // HACK - not hardcoded please
    var ghissue = client.issue('src-d/issues-lead-qualification', 37);

    ghissue.update({
        "state": "closed",
    }, function(){
        res.send('It is Working!');
    });

    console.log(events);

});

app.listen(5000);
