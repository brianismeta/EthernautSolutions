const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Vault Attacking script", function () {
  it("Deployment should work, n'est pas?", async function () {

    var assert = require('assert');
    var password = "p@ssw0rd!";
    const [deployer,attacker] = await ethers.getSigners();
    console.log(`Deployer/Owner address : ${deployer.address}`);
    console.log(`Attacker address ${attacker.address}`);
    console.log('');
    const VaultContractFactory = await ethers.getContractFactory('contracts/7_Vault.sol:Vault');
    const vaultcontract = await VaultContractFactory.deploy(ethers.utils.formatBytes32String(password));//overrides); //"meep",{value: { BigNumber: "1" }});
    await vaultcontract.deployed();
    console.log('Vault contract deployed to:', vaultcontract.address);
//ethers.provider._getTransactionRequest();

    const paddedSlot = utils.hexZeroPad(slot, 32);
    const storageLocation = await ethers.provider.getStorageAt(vaultcontract, paddedSlot);
    const storageValue = BigNumber.from(storageLocation);

  const stringData = utils.toUtf8String(
    storageValue.and(MaxUint256.sub(255)).toHexString()
  );
  return stringData.replace(/\x00/g, '');

    expect('0').to.equal('0');

    });
});    