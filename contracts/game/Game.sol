pragma solidity ^0.4.18;

import '../token/GameToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Game is Ownable {

    struct Prize {
        address issuer;
        uint256 amount;
        bytes   info;
        uint256 expiration;
        address winner;
    }

    GameToken public token;

    mapping(uint256 => Prize) public prizes;

    modifier onlyToken() {
        require(msg.sender == address(token));
        _;
    }

    function Game(GameToken _token) public {
        require(address(_token)!=address(0));
        token = _token;
    }

    function place(address _issuer, uint256 _amount, bytes _info, uint256 _expiration, uint256 _hash) onlyToken public {
        prizes[_hash] = Prize(_issuer, _amount, _info, _expiration, address(0));
    }

    function claim(uint256 _key) public returns (bool){

        uint256 hash = key_hash256(_key);

        Prize storage prize = prizes[hash];
        require(prize.issuer != address(0));
        require(prize.winner == address(0));

        if( prize.expiration!=0 && now>prize.expiration ){
            token.transfer(prize.issuer, prize.amount);
            delete(prizes[hash]);
            return false;
        }else{
            prize.winner = msg.sender;
            return true;
        }

    }



    function key_hash256(uint256 _key) public view returns(uint256) {
        return uint256(sha256(_key, address(this)));
    }


}