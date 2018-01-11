var request = require('request-promise');
var config = require('../Config');
const Promise = require('promise');


var transfer_old_tokens = function(wallet, user, dev) {

    return new Promise(function(resolve, reject){

        request({
            method: 'POST',
            uri: config.izx_game.api+'transfer_old_tokens',
            form: {
                address: wallet.address,
                user: user,
                dev: dev
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