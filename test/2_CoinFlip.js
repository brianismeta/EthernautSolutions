const { expect } = require("chai");

describe("CoinFlip Attacking contract", function () {
  it("Deployment should work, n'est pas?", async function () {

    var assert = require('assert');

    const CFContractFactory = await ethers.getContractFactory('contracts/2_CoinFlip.sol:CoinFlip');
    const cfcontract = await CFContractFactory.deploy();//overrides); //"meep",{value: { BigNumber: "1" }});
    await cfcontract.deployed();
    console.log('CoinFlip contract deployed to:', cfcontract.address);

    const CFAContractFactory = await ethers.getContractFactory('CoinFlipAttack');
    const cfacontract = await CFAContractFactory.deploy(cfcontract.address);//overrides); //"meep",{value: { BigNumber: "1" }});
    await cfacontract.deployed();
    console.log('CoinFlipAttack contract deployed to:', cfacontract.address);
    
    const [attacker] = await ethers.getSigners();
    //console.log(`Owner address : ${owner.address}`);
    console.log(`Attacker address ${attacker.address}`);

    // Verify consecutiveWins is 0
    const cW = await cfcontract.consecutiveWins();
    console.log(`Wins : ${cW} `);
    assert(cW == 0,"Wins must be zero");
    //const cWd = await cfcontract.consecutiveWins;
    //assert(initbalance.toString() === '1', 'Balance is unexpected');

    var wins = 0;
    for (var i=0; i<10;i++) {
        // Attacker to guess
        console.log(`Attacker to guess`);
        await cfacontract.flip();
        wins = await cfcontract.consecutiveWins();
        console.log(`Wins : ${wins} `);
    }
    expect(wins).to.equal('10');
  });
});