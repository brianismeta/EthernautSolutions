// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

interface randomInterface {
  struct data {
    address proxy;
    bytes4 selector;
    uint256 value;
  }
}

contract TokenHelper {
  address public owner;
  address public pendingOwner;
}

contract A is randomInterface, TokenHelper {
  address public router;
  B b;
  // there is a logic that performs delegatecalls into contract B
  constructor (address baddr) public {
    b = B(baddr);
    router = address(1);
  }
  function call_into_b() external {
    (bool success, bytes memory data) = address(b).delegatecall(abi.encodeWithSignature("call_me()"));
  }
}

contract B is TokenHelper {
  // some logic
  function call_me() public {
    owner = msg.sender;
  }
}


