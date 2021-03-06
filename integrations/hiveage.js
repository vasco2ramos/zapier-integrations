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

// Check if company (connection) exxists
    // If it exists -> create invoice
// If not
    // Create connection
    // Create invoice

// Send slack message mentioning invoices have been created
// Create them recurringly


exports.newInvoice = function (id, price, callback){
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

  request.post(invoiceOptions, getResponse).auth(config('HIVEAGE_TOKEN'),"",true);

  function getResponse(error, response, body) {
    console.log(body);
    console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        callback("success");
      } else {
        callback(error);
      }
      return;
  }
}


exports.newConnection = function (name, email){
  function getResponse(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        if(body["networks"] != undefined){
          // Return Hash Key
        } else {
          callback("Not Found");
        }
      } else {
        callback(error);
      }
      return;
  }
  request.post(networkOptions, getResponse).auth(config('HIVEAGE_TOKEN'),"",true);
  return;
}

// Returns a hash of the connection or -1 in case it is not found.
exports.getConnection = function (company, callback){
  function getResponse(error, response, body) {
      if (!error && response.statusCode == 200) {
        if(body["networks"] != undefined){
          var result = findCompany(body["networks"], company);
          if(result.length >0){
            callback(result[0]["id"]);
          }
        } else {
          callback("Not Found");
        }
      } else {
        callback(error);
      }
      return;
  }

  request.get(networkOptions, getResponse).auth(config('HIVEAGE_TOKEN'),"",true);
  return;
}

function findCompany(array, company){
    var filtered = _.filter(array, function(o) { return o["name"].includes(company); });
    return filtered;
}
