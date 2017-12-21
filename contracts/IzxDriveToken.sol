pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/DetailedERC20.sol';
import 'zeppelin-solidity/contracts/token/BurnableToken.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';


contract IzxDriveToken is DetailedERC20, MintableToken, BurnableToken {

    struct DroppedToken {
        address owner;
        uint256 amount;
        string  brand;
        uint256 till_time;
        bytes   info;
    }


    mapping(bytes32 => DroppedToken) public drops;

    function IzxDriveToken()
        DetailedERC20('IZX Drive Token', 'DRIVE', 18) public {

    }

    function mint(address _to, uint256 _amount) public returns (bool) {
        // check that owner has IZX tokens
    }

    function grant(address _to, uint256 _amount) public onlyOwner {

    }

    function drop(uint256 _amount, string _brand, bytes32 _hash, uint256 _till_time, bytes _info) public {
        drops[_hash] = DroppedToken(msg.sender, _amount, _brand, _till_time, _info);
    }

    function pick(uint256 _key) public {

        bytes32 hash = sha256(_key, address(this));
        DroppedToken storage drop = drops[hash];

        require(drop.owner!=address(0));
        require(drop.till_time==0 || drop.till_time>now);



    }

    function key_hash(uint256 _key) public view returns(bytes32) {
        return sha256(_key, address(this));
    }

}