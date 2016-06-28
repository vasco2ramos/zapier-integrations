var express = require("express");
var app = express();


//var github = require('octonode');


app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
