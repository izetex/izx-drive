var Web3 = require('web3');
var ProviderEngine = require('web3-provider-engine/provider.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var GaspriceSubprovider = require('web3-provider-engine/subproviders/gasprice.js');

var config = require('./Config');

var IzxToken = require('./contracts/IzxToken');
var IzxDriveToken = require('./contracts/IzxDriveToken');

var connect = function(eth_wallet, cb, url, timeout) {
    const engine = new ProviderEngine();
    engine.addProvider(new GaspriceSubprovider());
    engine.addProvider(new WalletSubprovider(eth_wallet, {
        approveTransaction: cb
    }));
    engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(url, timeout )));
    return new Web3(engine);
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
    }else if(wallet.wallet){
        this.ropsten = connect(wallet.wallet, wallet.approval_callback, config.ethereum.ropsten.url, config.ethereum.timeout);
        this.foundation = connect(wallet.wallet, wallet.approval_callback, config.ethereum.foundation.url, config.ethereum.timeout);
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