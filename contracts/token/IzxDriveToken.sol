pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/DetailedERC20.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import './GameToken.sol';

contract IzxDriveToken is DetailedERC20, GameToken, MintableToken {

    function IzxDriveToken()
        DetailedERC20('IZX Drive Token', 'DRIVE', 18) public {
    }

    function mint(address _to, uint256 _amount) public returns (bool) {
        // check that owner has IZX tokens
    }

    function grant(address _to, uint256 _amount) public onlyOwner {

    }

}