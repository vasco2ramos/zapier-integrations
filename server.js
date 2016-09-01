'use strict';

/*
What you are about to see represents how shity you can build something and it
still works. I take no responsability for anyone going after this point
...
...
...
...
Good Luck
*/

const express = require("express");
const bodyParser = require("body-parser");
const github = require('octonode');
const app = express();
require('./routes')(app);

// Config

// Create config file with this later
const dotenv = require('dotenv')
const ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') dotenv.load()

// end of Config


//var routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
  res.send('This app is working');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
