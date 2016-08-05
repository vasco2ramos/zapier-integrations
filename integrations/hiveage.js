'use strict';

const config = require('../config')
const request = require('request')

request.get(config('HIVEAGE_ENDPOINT')).auth(null, null, true, config('HIVEAGE_TOKEN'));

// Change this later to save opportunities and segment it by name and user
prosperworks.queryByStatus = function(func, status) {
    // Options Configuration
    options.form["page_number"] = 1; // Since options are global we need to change this everytime

    var i = 1, nOpportunities = 0;

    function getResponse(error, response, body) {
        if (!error && response.statusCode == 200) {
            if(body.length > 0){

            }
        }
    }
    request.post(options, getResponse);
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
