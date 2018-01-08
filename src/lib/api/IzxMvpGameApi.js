var request = require('request');
var config = require('../Config');

var transfer_old_tokens = function(wallet, user, dev) {
    request.post(config.izx_game.api+'transfer_old_tokens', {form: {
            address: wallet.address,
            user: user,
            dev: dev
        }
    });
};

module.exports = {
    transfer_old_tokens: transfer_old_tokens
};