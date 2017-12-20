var Web3 = require('web3');
var config = require('./Config');


var foundation = function() {
    return new Web3(new Web3.providers.HttpProvider(config.ethereum.foundation.url));
};


module.exports = {
    foundation: foundation
};