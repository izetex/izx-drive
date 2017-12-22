pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import 'zeppelin-solidity/contracts/token/BurnableToken.sol';

contract GameToken is MintableToken, BurnableToken {

    struct DroppedToken {
        address owner;
        address application;
        uint256 amount;
        string  brand;
        uint256 expiration;
        bytes   info;
    }

    mapping(uint256 => DroppedToken) public drops;
    mapping(address => uint256) public dropped_amount;
    mapping(address => uint256[]) public dropped_expiration;


    function mint(address _to, uint256 _amount) public returns (bool) {
        // check that owner has IZX tokens
    }

    function grant(address _to, uint256 _amount) public onlyOwner {

    }

    function drop(uint256 _hash, address _application, uint256 _amount, string _brand, uint256 _till_time, bytes _info) public {
        drops[_hash] = DroppedToken(msg.sender, _application, _amount, _brand, _till_time, _info);
    }

    function undrop(uint256 _hash) public {
        DroppedToken drop = drops[_hash];
        require(drop.owner==msg.sender);
        dropped_amount[drop.owner] -= drop.amount;
        delete(drops[_hash]);
    }

    function pick(uint256 _key) public returns (bool){

        uint256 hash = key_hash256(_key);
        DroppedToken drop = drops[hash];

        require(drop.owner!=address(0));

        if(drop.expiration!=0 && drop.expiration>now){
            delete(drops[hash]);
            return false;
        }else{
            require(balances[drop.owner]>=drop.amount);

            balances[drop.owner] -= drop.amount;
            balances[msg.sender] += drop.amount;

            Transfer(drop.owner, msg.sender, drop.amount);

            dropped_amount[drop.owner] -= drop.amount;
            delete(drops[hash]);

            return true;
        }
    }

    function drop_allowance(address _owner) public view returns (uint256){
        return balanceOf(_owner) - dropped_amount[_owner];
    }

    function key_hash256(uint256 _key) public view returns(uint256) {
        return uint256(sha256(_key, address(this)));
    }

}