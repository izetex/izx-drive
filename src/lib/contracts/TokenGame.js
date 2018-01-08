var Ethereum = require('../Ethereum');

const abi = [{"constant": true,"inputs": [],"name": "prize_tokens","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_hashes","type": "uint256[]"}],"name": "issue","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_key","type": "uint256"}],"name": "claim","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "prize_life_time","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "withdraw","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_hashes","type": "uint256[]"}],"name": "revoke","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_prize_tokens","type": "uint256"}],"name": "set_prize_tokens","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_newOwner","type": "address"}],"name": "changeOwner","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_key","type": "uint256"},{"name": "_winner","type": "address"}],"name": "claim_winner","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_key","type": "uint256"}],"name": "key_hash256","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "prizes","outputs": [{"name": "issuer","type": "address"},{"name": "owner","type": "address"},{"name": "tokens","type": "uint256"},{"name": "value","type": "uint256"},{"name": "expiration","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "pendingWithdrawals","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "controller","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "token","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [{"name": "_token","type": "address"},{"name": "_controller","type": "address"},{"name": "_prize_life_time","type": "uint256"},{"name": "_prize_tokens","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"name": "issuer","type": "address"},{"indexed": true,"name": "owner","type": "address"},{"indexed": false,"name": "hash","type": "uint256"},{"indexed": false,"name": "tokens","type": "uint256"},{"indexed": false,"name": "value","type": "uint256"},{"indexed": false,"name": "expiration","type": "uint256"}],"name": "Issue","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "issuer","type": "address"},{"indexed": true,"name": "owner","type": "address"},{"indexed": true,"name": "winner","type": "address"},{"indexed": false,"name": "hash","type": "uint256"},{"indexed": false,"name": "tokens","type": "uint256"},{"indexed": false,"name": "value","type": "uint256"}],"name": "Claim","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "issuer","type": "address"},{"indexed": true,"name": "owner","type": "address"},{"indexed": false,"name": "hash","type": "uint256"},{"indexed": false,"name": "tokens","type": "uint256"},{"indexed": false,"name": "value","type": "uint256"}],"name": "Revoke","type": "event"}];

const address = '0x08cCCA04dffA062D6526f9Eb08d158DBB54955e0';
const network = Ethereum.ropsten();

const contract = network.eth.contract(abi).at(address);

module.exports = {
};