const { expect } = require("chai");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Telephone Attacking contract", function () {
  it("Deployment should work, n'est pas?", async function () {

    var assert = require('assert');

    //Contract.address
    //const accounts = await ethers.provider.listAccounts();
    //console.log(accounts);
    const [deployer,attacker] = await ethers.getSigners();
    console.log(`Deployer/Owner address : ${deployer.address}`);
    console.log(`Attacker address ${attacker.address}`);
    console.log('');
    const TVContractFactory = await ethers.getContractFactory('contracts/3_Telephone.sol:Telephone');
    const tvcontract = await TVContractFactory.deploy();//overrides); //"meep",{value: { BigNumber: "1" }});
    await tvcontract.deployed();
    console.log('Telephone contract deployed to:', tvcontract.address);

    const TVAContractFactory = await ethers.getContractFactory('TelephoneAttack');
    const tvacontract = await TVAContractFactory.deploy(tvcontract.address);//overrides); //"meep",{value: { BigNumber: "1" }});
    await tvacontract.deployed();
    console.log('TelephoneAttack contract deployed to:', tvacontract.address);
    console.log('');

    const curowner = await tvcontract.owner();
    console.log('Telephone contract current owner:', curowner);
    
    await tvacontract.connect(attacker).Attack();

    const newowner = await tvcontract.owner();
    console.log('Telephone contract new owner:', newowner);
    
    expect(newowner).to.equal(attacker.address);
    });
});