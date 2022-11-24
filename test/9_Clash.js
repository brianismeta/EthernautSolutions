const { expect } = require("chai");
const { ethers } = require("hardhat");
const { TASK_NODE_GET_PROVIDER } = require("hardhat/builtin-tasks/task-names");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Clash script", function () {
  it("Deployment should work, n'est pas?", async function () {

    var assert = require('assert');
    //var password = "p@ssw0rd!";
    const [deployer] = await ethers.getSigners();
    console.log(`Deployer/Owner address : ${deployer.address}`);
    //console.log(`Attacker address ${attacker.address}`);
    console.log('');
    const BFactory = await ethers.getContractFactory('contracts/9_Clash.sol:B');
    const Bcontract = await BFactory.deploy();//overrides); //"meep",{value: { BigNumber: "1" }});
    await Bcontract.deployed();
    console.log('B contract deployed to:', Bcontract.address);

    const AFactory = await ethers.getContractFactory('contracts/9_Clash.sol:A');
    const Acontract = await AFactory.deploy(Bcontract.address);//overrides); //"meep",{value: { BigNumber: "1" }});
    await Acontract.deployed();
    console.log('A contract deployed to:', Acontract.address);

    console.log("All. A = ", await Acontract.owner(), " r= ", await Acontract.router());

    Acontract.call_into_b();
    console.log("All. A = ", await Acontract.owner(), " r= ", await Acontract.router());

    console.log(await ethers.provider.getStorageAt(Acontract.address,0));
    console.log(await ethers.provider.getStorageAt(Acontract.address,1));
    console.log(await ethers.provider.getStorageAt(Acontract.address,2));


    expect('0').to.equal('0');


    });
});    