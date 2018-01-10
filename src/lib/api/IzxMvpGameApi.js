var request = require('request-promise');
var config = require('../Config');

var transfer_old_tokens = function(wallet, user, dev) {
    return request({
        method: 'POST',
        uri: config.izx_game.api+'transfer_old_tokens',
        form: {
            address: wallet.address,
            user: user,
            dev: dev
        }
    });
};

module.exports = {
    transfer_old_tokens: transfer_old_tokens
};