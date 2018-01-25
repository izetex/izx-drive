var Promise = require('promise');

var abi = [{ "constant": true,"inputs": [],"name": "name","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_spender","type": "address"},{"name": "_value","type": "uint256"}],"name": "approve","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_from","type": "address"},{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "transferFrom","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "decimals","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_newController","type": "address"}],"name": "changeController","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "version","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"name": "balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_owner","type": "address"},{"name": "_amount","type": "uint256"}],"name": "generateTokens","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "transfer","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_owner","type": "address"},{"name": "_amount","type": "uint256"}],"name": "destroyTokens","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_owner","type": "address"},{"name": "_spender","type": "address"}],"name": "allowance","outputs": [{"name": "remaining","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_token","type": "address"}],"name": "claimTokens","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "controller","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "_token","type": "address"},{"indexed": true,"name": "_controller","type": "address"},{"indexed": false,"name": "_amount","type": "uint256"}],"name": "ClaimedTokens","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "owner","type": "address"},{"indexed": true,"name": "spender","type": "address"},{"indexed": false,"name": "value","type": "uint256"}],"name": "Approval","type": "event"}];
var address = '0x2ad180cbaffbc97237f572148fc1b283b68d8861';


function IzxToken(web3){
    this.name = 'IZX Token';
    this.symbol = 'IZX';
    this.contract = web3.eth.contract(abi).at(address);
    this.web3 = web3;
    this.address = address;
}

IzxToken.prototype.balanceOf = function(address) {
        var contract = this.contract;
        var web3 = this.web3;
        return new Promise(function(resolve, reject){
            contract.balanceOf(address, function (err, res) {
                if(err || !res){
                    reject(err);
                }else{
                    resolve( web3.fromWei(res).toNumber() );
                }
            });
        });
};

IzxToken.prototype.approve = function(spender, token_amount){
        var contract = this.contract;
        var web3 = this.web3;
        return new Promise(function(resolve, reject){
            contract.approve(spender, web3.toWei(token_amount),
                {gas: 60000, from: web3.eth.defaultAccount},
                function (err, res) {
                    if(err || !res){
                        reject(err);
                    }else{
                        resolve(res);
                    }
                });
        });
};

module.exports = IzxToken;

