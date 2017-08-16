'use strict'

// https service
var https = require('https');

module.exports = {
    getToken: getToken
}

// token info
var baseURL = '890407d7-e617-4d70-985f-01792d693387.predix-uaa.run.aws-usw02-pr.ice.predix.io'
var accessTokenURI = '/oauth/token?grant_type=client_credentials'
var publicKey = 'ZGlnaXRhbGludGVybjpAZGlnaXRhbGludGVybg=='
var clientID = 'digitalintern'
var clientSecret = '@digitalintern'

/*
* getToken
*   obtains a token from cityIQ and passes it to the callback function
* @return - uses a callback called next
*/
function getToken(next){
    var authString = 'Basic ' + publicKey

    var options = {
        host: baseURL,
        method: 'GET',
        path: accessTokenURI,
        headers: {
            'authorization': authString
        }
    };
    https.get(options, (res) => {

        let error;
        if (res.statusCode !== 200) {
            error = new Error(`Request Failed.\n` +
                              `Status Code: ${statusCode}`);
        } 

        var rawData = ''
        res.on('data', function (chunk) {
            rawData += chunk
        });
        res.on('end', function(){
            let parsedData = JSON.parse(rawData);
            next(parsedData.access_token)
        });
    });
}