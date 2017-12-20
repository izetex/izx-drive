pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/DetailedERC20.sol';
import 'zeppelin-solidity/contracts/token/BurnableToken.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';


contract IzxDriveToken is DetailedERC20, MintableToken, BurnableToken {

    function IzxDriveToken()
              DetailedERC20('IZX Drive Token', 'DRIVE', 18) public {

    }

    function mint(address _to, uint256 _amount) public returns (bool) {
        // check that owner has IZX tokens
    }

    function grant(address _to, uint256 _amount) public onlyOwner {

    }

    function drop(uint256 _amount, string _brand, bytes _hash, bytes _info) public {

    }

    function pick(uint256 _key) public {

    }


}