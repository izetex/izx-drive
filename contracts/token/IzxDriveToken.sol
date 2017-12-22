pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/DetailedERC20.sol';
import './GameToken.sol';

contract IzxDriveToken is DetailedERC20, GameToken {

    function IzxDriveToken()
        DetailedERC20('IZX Drive Token', 'DRIVE', 18) public {
    }

}