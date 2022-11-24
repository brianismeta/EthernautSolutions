// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract A {
  uint public v;
  B b;
  C c;  

  constructor(address baddr, address caddr) public {
    b = B(baddr);
    c = C(caddr);
    v = 30;
  }

  function reset() public {
    v = 30;
  }

  function mod_me() public {
    v = 31;
  }

  function mod_b() public {
    (bool success, bytes memory data) = address(b).delegatecall(abi.encodeWithSignature("mod_me()"));
  }

  function mod_c() public {
    (bool success, bytes memory data) = address(c).delegatecall(abi.encodeWithSignature("mod_me()"));
  }

  function mod_bc() public {
    (bool success, bytes memory data) = address(b).delegatecall(abi.encodeWithSignature("mod_c()"));
  }
  
}

contract B {
  uint public v;
  address b;
  C c;

  constructor (address caddr) public {
    c = C(caddr);
    v = 20;
  }

  function reset() public {
    v = 20;
  }

  function mod_me() public {
    v = 21;
  }

  function mod_c() public {
    address(c).delegatecall(abi.encodeWithSignature("mod_me()"));
  }
}

contract C {
  uint public v;
  address b;
  address c;

  constructor() public {
    v = 10;
  }

  function reset() public {
    v = 10;
  }
  function mod_me() public {
    v = 11;
  }
}
