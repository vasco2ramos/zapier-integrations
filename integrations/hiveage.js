'use strict';

const config = require('../config')
const request = require('request')
const _ = require('lodash')

const headers = {
    "Accept": "application/json",
    "user": config('HIVEAGE_TOKEN')
};

// Check if company (connection) exxists
    // If it exists -> create invoice
// If not
    // Create connection
    // Create invoice

// Send slack message mentioning invoices have been created
// Create them recurringly


exports.newInvoice = function (id){

}

exports.newConnection = function (id){

}

// Returns a hash of the connection or -1 in case it is not found.
exports.getConnection = function (company){

  function getResponse(error, response, body) {
      if (!error && response.statusCode == 200) {
          if(body.length > 0){
              request.post(options, getResponse);
          } else {


          }
      }
  }
  request.post(options, getResponse);

}
