// contracts/test/ReputationToken.test.js - Comprehensive test suite for ReputationToken contract
import { expect } from "chai";
import hre from "hardhat";

describe("ReputationToken", function () {
  let reputationToken, gigEscrow;
  let owner, user1, user2, unauthorized;
  const MINT_AMOUNT = hre.ethers.parseEther("100");
  const TRANSFER_AMOUNT = hre.ethers.parseEther("50");

  beforeEach(async function () {
    [owner, user1, user2, unauthorized] = await hre.ethers.getSigners();

    // Deploy GigEscrow first (required for ReputationToken)
      const GigEscrow = await hre.ethers.getContractFactory("GigEscrow");
    gigEscrow = await GigEscrow.deploy();
    await gigEscrow.waitForDeployment();

    // Deploy ReputationToken
    const ReputationToken = await hre.ethers.getContractFactory("ReputationToken");
    reputationToken = await ReputationToken.deploy(await gigEscrow.getAddress());
    await reputationToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy with correct initial state", async function () {
      expect(await reputationToken.name()).to.equal("GigStream Reputation Token");
      expect(await reputationToken.symbol()).to.equal("GST");
      expect(await reputationToken.decimals()).to.equal(18);
      expect(await reputationToken.totalSupply()).to.equal(0n);
      expect(await reputationToken.gigEscrow()).to.equal(await gigEscrow.getAddress());
      expect(await reputationToken.owner()).to.equal(owner.address);
    });

    it("Should revert when deploying with zero address", async function () {
      const ReputationToken = await hre.ethers.getContractFactory("ReputationToken");
      await expect(
        ReputationToken.deploy(hre.ethers.ZeroAddress)
      ).to.be.revertedWithCustomError(reputationToken, "InvalidAddress");
    });
  });

  describe("mint", function () {
    it("Should mint tokens when called by GigEscrow", async function () {
      // This test verifies that only GigEscrow can mint
      // We'll test the actual minting in the next test
      const gigEscrowAddress = await gigEscrow.getAddress();
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [gigEscrowAddress],
      });
      
      await hre.network.provider.send("hardhat_setBalance", [
        gigEscrowAddress,
        "0x" + hre.ethers.parseEther("1").toString(16),
      ]);

      const gigEscrowSigner = await hre.ethers.getSigner(gigEscrowAddress);
      
      // This should succeed when called by GigEscrow
      await expect(
        reputationToken.connect(gigEscrowSigner).mint(user1.address, MINT_AMOUNT, "Job completed")
      ).to.emit(reputationToken, "ReputationMinted");

      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [gigEscrowAddress],
      });
    });

    it("Should revert when called by non-GigEscrow address", async function () {
      await expect(
        reputationToken.connect(user1).mint(user1.address, MINT_AMOUNT, "Test")
      ).to.be.revertedWithCustomError(reputationToken, "OnlyGigEscrow");
    });

    it("Should revert when minting to zero address", async function () {
      // We need to impersonate GigEscrow to test this
      const gigEscrowAddress = await gigEscrow.getAddress();
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [gigEscrowAddress],
      });
      
      // Fund GigEscrow for gas
      await hre.network.provider.send("hardhat_setBalance", [
        gigEscrowAddress,
        "0x" + hre.ethers.parseEther("1").toString(16),
      ]);

      const gigEscrowSigner = await hre.ethers.getSigner(gigEscrowAddress);
      
      await expect(
        reputationToken.connect(gigEscrowSigner).mint(hre.ethers.ZeroAddress, MINT_AMOUNT, "Test")
      ).to.be.revertedWithCustomError(reputationToken, "InvalidAddress");

      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [gigEscrowAddress],
      });
    });

    it("Should emit Transfer and ReputationMinted events", async function () {
      const gigEscrowAddress = await gigEscrow.getAddress();
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [gigEscrowAddress],
      });
      
      // Fund GigEscrow for gas
      await hre.network.provider.send("hardhat_setBalance", [
        gigEscrowAddress,
        "0x" + hre.ethers.parseEther("1").toString(16),
      ]);

      const gigEscrowSigner = await hre.ethers.getSigner(gigEscrowAddress);
      
      await expect(
        reputationToken.connect(gigEscrowSigner).mint(user1.address, MINT_AMOUNT, "Job completed")
      ).to.emit(reputationToken, "Transfer")
        .withArgs(hre.ethers.ZeroAddress, user1.address, MINT_AMOUNT)
        .and.to.emit(reputationToken, "ReputationMinted")
        .withArgs(user1.address, MINT_AMOUNT, "Job completed");

      expect(await reputationToken.balanceOf(user1.address)).to.equal(MINT_AMOUNT);
      expect(await reputationToken.totalSupply()).to.equal(MINT_AMOUNT);

      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [await gigEscrow.getAddress()],
      });
    });
  });

  describe("burn", function () {
    beforeEach(async function () {
      // Mint tokens first
      const gigEscrowAddress = await gigEscrow.getAddress();
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [gigEscrowAddress],
      });
      
      // Fund GigEscrow for gas
      await hre.network.provider.send("hardhat_setBalance", [
        gigEscrowAddress,
        "0x" + hre.ethers.parseEther("1").toString(16),
      ]);

      const gigEscrowSigner = await hre.ethers.getSigner(gigEscrowAddress);
      await reputationToken.connect(gigEscrowSigner).mint(user1.address, MINT_AMOUNT, "Initial mint");
      
      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [gigEscrowAddress],
      });
    });

    it("Should burn tokens from own balance", async function () {
      const burnAmount = hre.ethers.parseEther("20");
      
      await expect(
        reputationToken.connect(user1).burn(user1.address, burnAmount, "Penalty")
      ).to.emit(reputationToken, "Transfer")
        .withArgs(user1.address, hre.ethers.ZeroAddress, burnAmount)
        .and.to.emit(reputationToken, "ReputationBurned")
        .withArgs(user1.address, burnAmount, "Penalty");

      expect(await reputationToken.balanceOf(user1.address)).to.equal(MINT_AMOUNT - burnAmount);
      expect(await reputationToken.totalSupply()).to.equal(MINT_AMOUNT - burnAmount);
    });

    it("Should burn tokens with allowance", async function () {
      const burnAmount = hre.ethers.parseEther("30");
      
      // Approve first
      await reputationToken.connect(user1).approve(user2.address, burnAmount);
      
      await expect(
        reputationToken.connect(user2).burn(user1.address, burnAmount, "Penalty")
      ).to.emit(reputationToken, "ReputationBurned")
        .withArgs(user1.address, burnAmount, "Penalty");

      expect(await reputationToken.balanceOf(user1.address)).to.equal(MINT_AMOUNT - burnAmount);
      expect(await reputationToken.allowance(user1.address, user2.address)).to.equal(0n);
    });

    it("Should revert with InsufficientBalance", async function () {
      await expect(
        reputationToken.connect(user1).burn(user1.address, MINT_AMOUNT + 1n, "Test")
      ).to.be.revertedWithCustomError(reputationToken, "InsufficientBalance");
    });

    it("Should revert with InsufficientAllowance when burning others tokens", async function () {
      await expect(
        reputationToken.connect(user2).burn(user1.address, TRANSFER_AMOUNT, "Test")
      ).to.be.revertedWithCustomError(reputationToken, "InsufficientAllowance");
    });
  });

  describe("transfer", function () {
    beforeEach(async function () {
      // Mint tokens - impersonate GigEscrow and fund it
      const gigEscrowAddress = await gigEscrow.getAddress();
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [gigEscrowAddress],
      });
      
      // Fund GigEscrow for gas
      await hre.network.provider.send("hardhat_setBalance", [
        gigEscrowAddress,
        "0x" + hre.ethers.parseEther("1").toString(16),
      ]);

      const gigEscrowSigner = await hre.ethers.getSigner(gigEscrowAddress);
      await reputationToken.connect(gigEscrowSigner).mint(user1.address, MINT_AMOUNT, "Initial mint");
      
      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [await gigEscrow.getAddress()],
      });
    });

    it("Should transfer tokens successfully", async function () {
      await expect(
        reputationToken.connect(user1).transfer(user2.address, TRANSFER_AMOUNT)
      ).to.emit(reputationToken, "Transfer")
        .withArgs(user1.address, user2.address, TRANSFER_AMOUNT);

      expect(await reputationToken.balanceOf(user1.address)).to.equal(MINT_AMOUNT - TRANSFER_AMOUNT);
      expect(await reputationToken.balanceOf(user2.address)).to.equal(TRANSFER_AMOUNT);
    });

    it("Should return true on successful transfer", async function () {
      const result = await reputationToken.connect(user1).transfer(user2.address, TRANSFER_AMOUNT);
      expect(result).to.not.be.undefined;
    });

    it("Should revert with InsufficientBalance", async function () {
      await expect(
        reputationToken.connect(user1).transfer(user2.address, MINT_AMOUNT + 1n)
      ).to.be.revertedWithCustomError(reputationToken, "InsufficientBalance");
    });

    it("Should revert when transferring to zero address", async function () {
      await expect(
        reputationToken.connect(user1).transfer(hre.ethers.ZeroAddress, TRANSFER_AMOUNT)
      ).to.be.revertedWithCustomError(reputationToken, "InvalidAddress");
    });
  });

  describe("transferFrom", function () {
    beforeEach(async function () {
      // Mint tokens - impersonate GigEscrow and fund it
      const gigEscrowAddress = await gigEscrow.getAddress();
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [gigEscrowAddress],
      });
      
      // Fund GigEscrow for gas
      await hre.network.provider.send("hardhat_setBalance", [
        gigEscrowAddress,
        "0x" + hre.ethers.parseEther("1").toString(16),
      ]);

      const gigEscrowSigner = await hre.ethers.getSigner(gigEscrowAddress);
      await reputationToken.connect(gigEscrowSigner).mint(user1.address, MINT_AMOUNT, "Initial mint");
      
      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [await gigEscrow.getAddress()],
      });
    });

    it("Should transfer tokens with allowance", async function () {
      await reputationToken.connect(user1).approve(user2.address, TRANSFER_AMOUNT);
      
      await expect(
        reputationToken.connect(user2).transferFrom(user1.address, user2.address, TRANSFER_AMOUNT)
      ).to.emit(reputationToken, "Transfer")
        .withArgs(user1.address, user2.address, TRANSFER_AMOUNT);

      expect(await reputationToken.balanceOf(user1.address)).to.equal(MINT_AMOUNT - TRANSFER_AMOUNT);
      expect(await reputationToken.balanceOf(user2.address)).to.equal(TRANSFER_AMOUNT);
      expect(await reputationToken.allowance(user1.address, user2.address)).to.equal(0n);
    });

    it("Should revert with InsufficientAllowance", async function () {
      await expect(
        reputationToken.connect(user2).transferFrom(user1.address, user2.address, TRANSFER_AMOUNT)
      ).to.be.revertedWithCustomError(reputationToken, "InsufficientAllowance");
    });

    it("Should revert with InsufficientBalance", async function () {
      await reputationToken.connect(user1).approve(user2.address, MINT_AMOUNT + 1n);
      
      await expect(
        reputationToken.connect(user2).transferFrom(user1.address, user2.address, MINT_AMOUNT + 1n)
      ).to.be.revertedWithCustomError(reputationToken, "InsufficientBalance");
    });
  });

  describe("approve", function () {
    it("Should approve spender", async function () {
      await expect(
        reputationToken.connect(user1).approve(user2.address, TRANSFER_AMOUNT)
      ).to.emit(reputationToken, "Approval")
        .withArgs(user1.address, user2.address, TRANSFER_AMOUNT);

      expect(await reputationToken.allowance(user1.address, user2.address)).to.equal(TRANSFER_AMOUNT);
    });

    it("Should return true on successful approve", async function () {
      const result = await reputationToken.connect(user1).approve(user2.address, TRANSFER_AMOUNT);
      expect(result).to.not.be.undefined;
    });
  });

  describe("getReputation", function () {
    it("Should return balance as reputation", async function () {
      expect(await reputationToken.getReputation(user1.address)).to.equal(0n);

      // Mint tokens - impersonate GigEscrow and fund it
      const gigEscrowAddress = await gigEscrow.getAddress();
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [gigEscrowAddress],
      });
      
      // Fund GigEscrow for gas
      await hre.network.provider.send("hardhat_setBalance", [
        gigEscrowAddress,
        "0x" + hre.ethers.parseEther("1").toString(16),
      ]);

      const gigEscrowSigner = await hre.ethers.getSigner(gigEscrowAddress);
      await reputationToken.connect(gigEscrowSigner).mint(user1.address, MINT_AMOUNT, "Test");
      
      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [await gigEscrow.getAddress()],
      });

      expect(await reputationToken.getReputation(user1.address)).to.equal(MINT_AMOUNT);
      expect(await reputationToken.balanceOf(user1.address)).to.equal(MINT_AMOUNT);
    });
  });
});

