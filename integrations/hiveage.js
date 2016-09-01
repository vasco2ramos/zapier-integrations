'use strict';

const config = require('../config')
const request = require('request')
const _ = require('lodash')

const headers = {
    "Accept": "application/json"
};

var options = {
  url: 'https://sourced.hiveage.com/api/network',
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


exports.newInvoice = function (id){

}

exports.newConnection = function (id){


}

// Returns a hash of the connection or -1 in case it is not found.
exports.getConnection = function (company, callback){
  function getResponse(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body["networks"]);
        if(body["networks"] != undefined){
          var result = findCompany(body["networks"], company);
          if(result.length >0){
            callback(result[0]["hash_key"]);
          }/* else{
            request.get(options, getResponse).auth(config('HIVEAGE_TOKEN'),"",true);
          }*/
        } else {
          callback("Not Found");
        }
      } else {
        callback(error);
      }
      return;
  }
  request.get(options, getResponse).auth(config('HIVEAGE_TOKEN'),"",true);
  return;
}

function findCompany(array, company){
    var filtered = _.filter(array, function(o) { return o["name"].includes(company); });
    return filtered;
}
