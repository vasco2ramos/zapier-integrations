const express = require("express");
const bodyParser = require("body-parser");
const github = require('octonode');
const app = express();

// Config

// Create config file with this later
const dotenv = require('dotenv')
const ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') dotenv.load()

// end of Config


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
  res.send('This app is working');
});

app.post('/close', function(req, res){

    if(!req.body.number){
        console.log(req.body);
        return
    }

    // Close Issue
    // If this file of webhooks grows put this into a function later
    var client = github.client(process.env.GITHUB_KEY);
    var ghissue = client.issue(process.env.ISSUES_REPO, req.body.number);

    ghissue.update({
        "state": "closed",
    }, function(err, data, headers) {
        if(err) {
            console.log(err);
            res.send(err);
            return
        }
        res.send(data)
    });
    // End of Close issue

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
