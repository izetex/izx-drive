var Web3 = require('web3');
var config = require('./Config');

var IzxToken = require('./contracts/IzxToken');
var IzxDriveToken = require('./contracts/IzxDriveToken');

var foundation = function() {
    return new Web3(new Web3.providers.HttpProvider(config.ethereum.foundation.url,
        config.ethereum.timeout));
};

var ropsten = function() {
    return new Web3(new Web3.providers.HttpProvider(config.ethereum.ropsten.url,
        config.ethereum.timeout
    ));
};

function Connection(wallet){

    if(wallet.web3){
        if(wallet.web3.isConnected()){
            switch(wallet.web3.version.network){
                case '1':
                    this.foundation = web3;
                    break;
                case '3':
                    this.ropsten = web3;
                    break;
            }
        }
    }else{
        this.ropsten = ropsten();
        this.foundation = foundation();
    }

    this.tokens = [];

    if(this.ropsten)
        this.tokens.push(new IzxDriveToken(this.ropsten));

    if(this.foundation)
        this.tokens.push(new IzxToken(this.foundation));


};

Connection.prototype.connected = function(){
    return this.ropsten || this.foundation;
};

module.exports = Connection;