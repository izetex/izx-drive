var bip39 = require('bip39');
var hdkey = require('ethereumjs-wallet/hdkey');
var eth = require('ethereumjs-wallet');
var Buffer = require('buffer/').Buffer;

var Connection = require('./lib/Connection');


function Wallet(){

    this.imported = this.exported = false;
    this.mnemonic = this.privateKey = this.address = this.web3 = this.connection = this.wallet = null;
}

Wallet.prototype.import = function(credentials) {

    if(typeof(credentials)!='string')
        throw "String expected";
    var trimmed = credentials.trim();
    var words = trimmed.split(' ');

    if(words.length==12){

        if(!bip39.validateMnemonic(trimmed))
            throw "Invalid mnemonics";
        var h = hdkey.fromMasterSeed(bip39.mnemonicToSeed(trimmed));
        this.wallet = h.derivePath("m/44'/60'/0'/0/0").getWallet();

        this.address = this.wallet.getAddressString();
        this.privateKey = this.wallet.getPrivateKeyString();
        this.mnemonic = trimmed;
        this.imported = true;
        this.connection = new Connection(this);
    }else if(trimmed.match(/(0x)?[\da-fA-F]{64}/)){

        if(trimmed.indexOf('0x')==0)
            trimmed = trimmed.slice(2);

        this.wallet = eth.fromPrivateKey(Buffer.from(trimmed, "hex"));
        this.address = this.wallet.getAddressString();
        this.privateKey = this.wallet.getPrivateKeyString();
        this.mnemonic = null;
        this.imported = true;
        this.connection = new Connection(this);
    }else{
        throw "Wallet import from "+credentials+" is not possible";
    }
};

Wallet.prototype.lock = function() {
    this.imported = this.exported = false;
    this.mnemonic = this.privateKey = this.address = this.web3 = this.connection = this.wallet = null;
};

Wallet.prototype.export = function(password) {
    if(!this.wallet) {
        throw "There is nothing to export";
    }
    var json = this.wallet.toV3(password);
    this.exported = true;
    return json;
};

Wallet.prototype.load = function(input, password) {
    this.wallet = eth.fromV3(input,password);
    this.address = this.wallet.getAddressString();
    this.privateKey = this.wallet.getPrivateKeyString();
    this.imported = true;
    this.connection = new Connection(this);
};

Wallet.prototype.generate_new = function() {
    this.mnemonic = bip39.generateMnemonic();
    var h = hdkey.fromMasterSeed(bip39.mnemonicToSeed(this.mnemonic));
    this.wallet = h.derivePath("m/44'/60'/0'/0/0").getWallet();
    this.address = this.wallet.getAddressString();
    this.privateKey = this.wallet.getPrivateKeyString();
    this.connection = new Connection(this);
};

Wallet.prototype.connect_web3 = function(web3) {
    this.web3  = web3;
    this.privateKey = this.mnemonic = this.address = this.wallet = null;
    if(web3){
        this.address = web3.eth.accounts[0];
    }
    this.connection = new Connection(this);
};


Wallet.prototype.tokens = function(){
    if(!this.connection)
        return null;
    return this.connection.tokens;
};

Wallet.prototype.token_balances = function(){
  if(!this.connection)
      return null;
  var wallet_address = this.address;
  return this.connection.tokens.map(function(t){
      return {
          symbol: t.symbol,
          name: t.name,
          amount: t.balanceOf(wallet_address)
      };
  });

};

module.exports = Wallet;
