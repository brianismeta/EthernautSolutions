const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Force Attacking script", function () {
  it("Deployment should work, n'est pas?", async function () {

    var assert = require('assert');

    //const sixty_four_zeroes = "0000000000000000000000000000000000000000000000000000000000000000";
    const [deployer,attacker] = await ethers.getSigners();
    console.log(`Deployer/Owner address : ${deployer.address}`);
    console.log(`Attacker address ${attacker.address}`);
    console.log('');
    const ForceContractFactory = await ethers.getContractFactory('contracts/6_Force.sol:Force');
    // send some eth before we steal it!
    //const overrides = { value: ethers.utils.parseUnits("1", "wei")} ;
    const forcecontract = await ForceContractFactory.deploy(); //"meep",{value: { BigNumber: "1" }});
    await forcecontract.deployed();
    console.log('Force contract deployed to:', forcecontract.address);
    const DeathContractFactory = await ethers.getContractFactory('contracts/6_Force.sol:Death');
    // send some eth before we steal it!
    const overrides = { value: ethers.utils.parseUnits("1", "wei")} ;
    const deathcontract = await DeathContractFactory.deploy(forcecontract.address, overrides);//overrides); //"meep",{value: { BigNumber: "1" }});
    await deathcontract.deployed();
    console.log('Death contract deployed to:', deathcontract.address);

    var bal = await ethers.provider.getBalance(forcecontract.address);
    console.log('Force contract balance: ' + bal);
    // two contracts are deployed... let's rock and roll!
    //console.log('Owner of Delegate contract   :', await delegatecontract.owner());
    //console.log('Owner of Delegation contract :', await delegationcontract.owner());
    expect('0').to.equal('0');

    });
});    