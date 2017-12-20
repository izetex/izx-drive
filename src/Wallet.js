var bip39 = require('bip39');
var hdkey = require('ethereumjs-wallet/hdkey');
var eth = require('ethereumjs-wallet');
var Buffer = require('buffer/').Buffer;

var IzxToken = require('./lib/IzxToken');

function Wallet(){

    this.imported = false;
    this.exported = false;
    this.mnemonic = null;
    this.privateKey = null;
    this.address = null;
}

Wallet.prototype.initialized = function() {
    return !!this.address;
};

Wallet.prototype.import = function(credentials) {

    if(typeof(credentials)!='string')
        throw "String expected";
    var trimmed = credentials.trim();
    var words = trimmed.split(' ');

    if(words.length==12){

        if(!bip39.validateMnemonic(trimmed))
            throw "Invalid mnemonics";
        var h = hdkey.fromMasterSeed(bip39.mnemonicToSeed(trimmed));
        var wallet = h.derivePath("m/44'/60'/0'/0/0").getWallet();

        this.address = wallet.getAddressString();
        this.privateKey = wallet.getPrivateKeyString();
        this.mnemonic = trimmed;
        this.imported = true;

    }else if(trimmed.match(/(0x)?[\da-fA-F]{64}/)){

        if(trimmed.indexOf('0x')==0)
            trimmed = trimmed.slice(2);

        var wallet = eth.fromPrivateKey(Buffer.from(trimmed, "hex"));
        this.address = wallet.getAddressString();
        this.privateKey = wallet.getPrivateKeyString();
        this.mnemonic = null;
        this.imported = true;

    }else{
        throw "Wallet import from "+credentials+" is not possible";
    }


};

Wallet.prototype.export = function() {
    if(this.initialized()){
        var data = { privateKey: this.privateKey };
        if(this.mnemonic)
            data.mnemonic = this.mnemonic;
        return data;
    }else{
        return null;
    }
};

Wallet.prototype.generate_new = function() {
    this.mnemonic = bip39.generateMnemonic();
    var h = hdkey.fromMasterSeed(bip39.mnemonicToSeed(this.mnemonic));
    var wallet = h.derivePath("m/44'/60'/0'/0/0").getWallet();

    this.address = wallet.getAddressString();
    this.privateKey = wallet.getPrivateKeyString();
};

Wallet.prototype.export = function() {
    if(this.initialized()){
        var data = { privateKey: this.privateKey };
        if(this.mnemonic)
            data.mnemonic = this.mnemonic;
        return data;
    }else{
        return null;
    }
};

Wallet.prototype.token_balances = function(){

  if(!this.initialized())
      return null;

  return [
          {
            symbol: IzxToken.symbol,
            name: IzxToken.name,
            amount: IzxToken.balanceOf(this.address)
          }
      ];

};

module.exports = Wallet;
