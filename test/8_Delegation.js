const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Multidelegation script", function () {
  it("Deployment should work, n'est pas?", async function () {

    var assert = require('assert');
    //var password = "p@ssw0rd!";
    const [deployer] = await ethers.getSigners();
    console.log(`Deployer/Owner address : ${deployer.address}`);
    //console.log(`Attacker address ${attacker.address}`);
    console.log('');
    const CFactory = await ethers.getContractFactory('contracts/8_Delegation.sol:C');
    const Ccontract = await CFactory.deploy();//overrides); //"meep",{value: { BigNumber: "1" }});
    await Ccontract.deployed();
    console.log('C contract deployed to:', Ccontract.address);

    const BFactory = await ethers.getContractFactory('contracts/8_Delegation.sol:B');
    const Bcontract = await BFactory.deploy(Ccontract.address);//overrides); //"meep",{value: { BigNumber: "1" }});
    await Bcontract.deployed();
    console.log('B contract deployed to:', Bcontract.address);

    const AFactory = await ethers.getContractFactory('contracts/8_Delegation.sol:A');
    const Acontract = await AFactory.deploy(Bcontract.address,Ccontract.address);//overrides); //"meep",{value: { BigNumber: "1" }});
    await Acontract.deployed();
    console.log('A contract deployed to:', Acontract.address);

    await Acontract.mod_me(); await Bcontract.mod_me(); await Ccontract.mod_me();
    console.log("All. A = ", await Acontract.v(), " B = " , await Bcontract.v() , " C = " , await Ccontract.v());
    await Acontract.reset(); await Bcontract.reset(); await Ccontract.reset();
    console.log("Off. A = ", await Acontract.v(), " B = " , await Bcontract.v() , " C = " , await Ccontract.v());

    await Ccontract.mod_me();
    console.log("2. A = ", await Acontract.v(), " B = " , await Bcontract.v() , " C = " , await Ccontract.v());
    await Acontract.reset(); await Bcontract.reset(); await Ccontract.reset();
    await Bcontract.mod_me();
    console.log("3. A = ", await Acontract.v(), " B = " , await Bcontract.v() , " C = " , await Ccontract.v());
    await Acontract.reset(); await Bcontract.reset(); await Ccontract.reset();
    await Bcontract.mod_c();
    console.log("4. A = ", await Acontract.v(), " B = " , await Bcontract.v() , " C = " , await Ccontract.v());
    await Acontract.reset(); await Bcontract.reset(); await Ccontract.reset();
    await Acontract.mod_c();
    console.log("5. A = ", await Acontract.v(), " B = " , await Bcontract.v() , " C = " , await Ccontract.v());
    await Acontract.reset(); await Bcontract.reset(); await Ccontract.reset();
    await Acontract.mod_b();
    console.log("6. A = ", await Acontract.v(), " B = " , await Bcontract.v() , " C = " , await Ccontract.v());
    await Acontract.reset(); await Bcontract.reset(); await Ccontract.reset();
    await Acontract.mod_bc();
    console.log("7. A = ", await Acontract.v(), " B = " , await Bcontract.v() , " C = " , await Ccontract.v());
    await Acontract.reset(); await Bcontract.reset(); await Ccontract.reset();
    await Acontract.mod_me();
    console.log("8. A = ", await Acontract.v(), " B = " , await Bcontract.v() , " C = " , await Ccontract.v());


    expect('0').to.equal('0');


    });
});    