'use strict';

const config = require('../config')
const request = require('request')
const _ = require('lodash')
const moment = require('moment')

const headers = {
    "Accept": "application/json"
};

var networkOptions = {
  url: 'https://sourced.hiveage.com/api/network',
  headers: headers,
  json: true,
}

var invoiceOptions = {
  url: 'https://sourced.hiveage.com/api/invs',
  headers: headers,
  json: true,
}

exports.newInvoice = function (id, price, callback){

  // Move this to a function later so we can keep this one short and sweet.
  // ----------------

  var today = new Date();
  var date = today.toJSON().slice(0,10);
  var statement_no = today.getMonth() + "-" + today.getYear();
  // Takes into account the year + month change? (use moment instead?)
  //var due_date = today.setMonth(today.getMonth() + 1).toJSON().slice(0,10);

  var expense = {
      "date": date,
      "description": "TESTING",
      "quantity": 1,
      "price": price,
      "sort_order": 1
  };

  var invoice = {
      "connection_id": id,
      "date": date,
      "statement_no": statement_no,
      "due_date": date,
      "items_attributes": [expense]
    };


  invoiceOptions.form = {"invoice": invoice};

  // ----------------- until here


  var getResponse = generateResponse(callback);
  request.post(invoiceOptions, getResponse).auth(config('HIVEAGE_TOKEN'),"",true);

}


exports.newConnection = function (name, email, callback){
  var connection = buildConnection(name, email);
  var getResponse = generateResponse(callback);

  request.post(networkOptions, getResponse).auth(config('HIVEAGE_TOKEN'),"",true);
  return;
}

// Returns the id of the connection or -1 in case it is not found.
// CONSIDERATION: Maybe should change this to return the complete connection
exports.getConnection = function (company, callback){

  function checkConnections(body) {
    if(body["networks"] != undefined){
      var result = findCompany(body["networks"], company);
      if(result.length >0){
        callback(result[0]["id"]);
      }
    } else {
      callback(body);
    }
  }

  var getResponse = generateResponse(checkConnections);
  request.get(networkOptions, getResponse).auth(config('HIVEAGE_TOKEN'),"",true);
  return;
}


// Lambda Function for ease of getting response.
function generateResponse(callback){
  return function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      } else {
        callback(error);
      }
      return;
  }
}

function findCompany(array, company){
    var filtered = _.filter(array, function(o) { return o["name"].includes(company); });
    return filtered;
}
