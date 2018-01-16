var request = require('request-promise');
var config = require('../Config');
var Promise = require('promise');


var transfer_old_tokens = function(wallet, hash) {

    return new Promise(function(resolve, reject){

        request({
            method: 'POST',
            uri: config.izx_game.api+'transfer_old_tokens',
            form: {
                address: wallet.address,
                hash: hash
            },
            timeout: config.izx_game.timeout
        }).then(function (body) {
            var json = JSON.parse(body);
            if(json.error){
                reject(json.error)
            }else{
                resolve(json);
            }
        }).catch(function (err) {
            reject(err);
        });

    });

};

module.exports = {
    transfer_old_tokens: transfer_old_tokens
};