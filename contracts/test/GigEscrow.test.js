// contracts/test/GigEscrow.test.js - Comprehensive test suite for GigEscrow contract
import { expect } from "chai";
import hre from "hardhat";

describe("GigEscrow", function () {
  let gigEscrow;
  let owner, employer, worker, worker2, unauthorized;
  const JOB_REWARD = hre.ethers.parseEther("0.1");
  const STARTING_BALANCE = hre.ethers.parseEther("10");
  const MIN_REPUTATION = 10n;
  const MIN_DEADLINE_OFFSET = 86400n; // 1 day in seconds

  // Helper function to set reputation via storage manipulation
  async function setReputation(contract, address, value) {
    const contractAddress = await contract.getAddress();
    // Reputation mapping is at storage slot 2 (jobs=0, jobBids=1, reputation=2)
    // For mappings: keccak256(abi.encode(key, slot))
    const encoded = hre.ethers.AbiCoder.defaultAbiCoder().encode(
      ["address", "uint256"],
      [address, 2n]
    );
    const reputationSlot = hre.ethers.keccak256(encoded);
    const storageValue = hre.ethers.zeroPadValue(hre.ethers.toBeHex(value), 32);
    
    await hre.network.provider.send("hardhat_setStorageAt", [
      contractAddress,
      reputationSlot,
      storageValue,
    ]);
    
    // Verify it was set
    const currentRep = await contract.reputation(address);
    if (currentRep !== value) {
      // Try alternative encoding (solidityPacked)
      const encoded2 = hre.ethers.solidityPacked(
        ["address", "uint256"],
        [address, 2n]
      );
      const reputationSlot2 = hre.ethers.keccak256(encoded2);
      await hre.network.provider.send("hardhat_setStorageAt", [
        contractAddress,
        reputationSlot2,
        storageValue,
      ]);
    }
  }

  beforeEach(async function () {
    [owner, employer, worker, worker2, unauthorized] = await hre.ethers.getSigners();

    // Deploy GigEscrow
    const GigEscrow = await hre.ethers.getContractFactory("GigEscrow");
    gigEscrow = await GigEscrow.deploy();
    await gigEscrow.waitForDeployment();

    // Fund accounts
    await hre.network.provider.send("hardhat_setBalance", [
      employer.address,
      "0x" + STARTING_BALANCE.toString(16),
    ]);
    await hre.network.provider.send("hardhat_setBalance", [
      worker.address,
      "0x" + STARTING_BALANCE.toString(16),
    ]);
    await hre.network.provider.send("hardhat_setBalance", [
      worker2.address,
      "0x" + STARTING_BALANCE.toString(16),
    ]);
  });

  describe("Deployment", function () {
    it("Should deploy with correct initial state", async function () {
      expect(await gigEscrow.jobCounter()).to.equal(0n);
      expect(await gigEscrow.MIN_DEADLINE_OFFSET()).to.equal(MIN_DEADLINE_OFFSET);
    });
  });

  describe("postJob", function () {
    it("Should post a job successfully", async function () {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;
      
      await expect(
        gigEscrow.connect(employer).postJob(
          "Plomero CDMX",
          "Polanco",
          JOB_REWARD,
          deadline,
          { value: JOB_REWARD }
        )
      ).to.emit(gigEscrow, "JobPosted")
        .withArgs(1n, employer.address, "Plomero CDMX", JOB_REWARD, deadline);

      expect(await gigEscrow.jobCounter()).to.equal(1n);
      
      const job = await gigEscrow.jobs(1);
      expect(job.id).to.equal(1n);
      expect(job.employer).to.equal(employer.address);
      expect(job.title).to.equal("Plomero CDMX");
      expect(job.location).to.equal("Polanco");
      expect(job.reward).to.equal(JOB_REWARD);
      expect(job.worker).to.equal(hre.ethers.ZeroAddress);
      expect(job.completed).to.be.false;
      expect(job.cancelled).to.be.false;
    });

    it("Should revert with InsufficientPayment when value < reward", async function () {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;
      
      await expect(
        gigEscrow.connect(employer).postJob(
          "Test",
          "Test",
          JOB_REWARD,
          deadline,
          { value: JOB_REWARD - 1n }
        )
      ).to.be.revertedWithCustomError(gigEscrow, "InsufficientPayment");
    });

    it("Should revert with InvalidDeadline when deadline too soon", async function () {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n; // 1 hour
      
      await expect(
        gigEscrow.connect(employer).postJob(
          "Test",
          "Test",
          JOB_REWARD,
          deadline,
          { value: JOB_REWARD }
        )
      ).to.be.revertedWithCustomError(gigEscrow, "InvalidDeadline");
    });

    it("Should add job to userJobs mapping", async function () {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;
      
      await gigEscrow.connect(employer).postJob(
        "Job 1",
        "Location 1",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );

      await gigEscrow.connect(employer).postJob(
        "Job 2",
        "Location 2",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );

      const userJobs = await gigEscrow.getUserJobs(employer.address);
      expect(userJobs.length).to.equal(2);
      expect(userJobs[0]).to.equal(1n);
      expect(userJobs[1]).to.equal(2n);
    });
  });

  describe("placeBid", function () {
    let jobId;
    const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;

    beforeEach(async function () {
      // Post a job
      await gigEscrow.connect(employer).postJob(
        "Test Job",
        "Test Location",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );
      jobId = 1n;

      // Set reputation for worker using helper function
      await setReputation(gigEscrow, worker.address, MIN_REPUTATION);
    });

    it("Should place a bid successfully", async function () {
      await expect(
        gigEscrow.connect(worker).placeBid(jobId, 0n)
      ).to.emit(gigEscrow, "BidPlaced");
      
      // Verify bid was placed
      const jobBids = await gigEscrow.getJobBids(jobId);
      expect(jobBids.length).to.equal(1);
      expect(jobBids[0].worker).to.equal(worker.address);
      expect(jobBids[0].amount).to.equal(0n);

      const bids = await gigEscrow.getJobBids(jobId);
      expect(bids.length).to.equal(1);
      expect(bids[0].worker).to.equal(worker.address);
      expect(bids[0].amount).to.equal(0n);
      expect(bids[0].accepted).to.be.false;
    });

    it("Should allow placing bid with zero reputation", async function () {
      // Reputation requirement removed - workers can bid with any reputation level
      await expect(
        gigEscrow.connect(worker2).placeBid(jobId, 0n)
      ).to.emit(gigEscrow, "BidPlaced");
    });

    it("Should revert with JobNotFound for invalid job ID", async function () {
      await expect(
        gigEscrow.connect(worker).placeBid(999n, 0n)
      ).to.be.revertedWithCustomError(gigEscrow, "JobNotFound");
    });

    it("Should revert with JobAlreadyAssigned when job has worker", async function () {
      // Accept a bid first
      await gigEscrow.connect(employer).acceptBid(jobId, worker.address);
      
      await expect(
        gigEscrow.connect(worker2).placeBid(jobId, 0n)
      ).to.be.revertedWithCustomError(gigEscrow, "JobAlreadyAssigned");
    });

    it("Should revert with JobAlreadyCancelled when job is cancelled", async function () {
      await gigEscrow.connect(employer).cancelJob(jobId);
      
      await expect(
        gigEscrow.connect(worker).placeBid(jobId, 0n)
      ).to.be.revertedWithCustomError(gigEscrow, "JobAlreadyCancelled");
    });

    it("Should allow multiple bids on same job", async function () {
      // Set reputation for worker2
      await setReputation(gigEscrow, worker2.address, MIN_REPUTATION);

      await gigEscrow.connect(worker).placeBid(jobId, 0n);
      await gigEscrow.connect(worker2).placeBid(jobId, hre.ethers.parseEther("0.05"));

      const bids = await gigEscrow.getJobBids(jobId);
      expect(bids.length).to.equal(2);
    });
  });

  describe("acceptBid", function () {
    let jobId;
    const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;

    beforeEach(async function () {
      await gigEscrow.connect(employer).postJob(
        "Test Job",
        "Test Location",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );
      jobId = 1n;

      // Set reputation and place bid
      await setReputation(gigEscrow, worker.address, MIN_REPUTATION);
      await gigEscrow.connect(worker).placeBid(jobId, 0n);
    });

    it("Should accept a bid successfully", async function () {
      await expect(
        gigEscrow.connect(employer).acceptBid(jobId, worker.address)
      ).to.emit(gigEscrow, "JobAccepted")
        .withArgs(jobId, worker.address, employer.address);

      const job = await gigEscrow.jobs(jobId);
      expect(job.worker).to.equal(worker.address);

      const bids = await gigEscrow.getJobBids(jobId);
      expect(bids[0].accepted).to.be.true;

      const workerJobs = await gigEscrow.getWorkerJobs(worker.address);
      expect(workerJobs.length).to.equal(1);
      expect(workerJobs[0]).to.equal(jobId);
    });

    it("Should revert with NotAuthorized when not employer", async function () {
      await expect(
        gigEscrow.connect(unauthorized).acceptBid(jobId, worker.address)
      ).to.be.revertedWithCustomError(gigEscrow, "NotAuthorized");
    });

    it("Should revert with JobAlreadyAssigned when job has worker", async function () {
      await gigEscrow.connect(employer).acceptBid(jobId, worker.address);
      
      await expect(
        gigEscrow.connect(employer).acceptBid(jobId, worker2.address)
      ).to.be.revertedWithCustomError(gigEscrow, "JobAlreadyAssigned");
    });
  });

  describe("completeJob", function () {
    let jobId;
    const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;

    beforeEach(async function () {
      await gigEscrow.connect(employer).postJob(
        "Test Job",
        "Test Location",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );
      jobId = 1n;

      // Set reputation, place bid, and accept
      await setReputation(gigEscrow, worker.address, MIN_REPUTATION);
      await gigEscrow.connect(worker).placeBid(jobId, 0n);
      await gigEscrow.connect(employer).acceptBid(jobId, worker.address);
    });

    it("Should complete job and release payment", async function () {
      const initialBalance = await hre.ethers.provider.getBalance(worker.address);
      const initialReputation = await gigEscrow.reputation(worker.address);

      await expect(
        gigEscrow.connect(worker).completeJob(jobId)
      ).to.emit(gigEscrow, "JobCompleted")
        .withArgs(jobId, worker.address, JOB_REWARD)
        .and.to.emit(gigEscrow, "ReputationUpdated")
        .withArgs(worker.address, initialReputation + 1n);

      const finalBalance = await hre.ethers.provider.getBalance(worker.address);
      expect(finalBalance - initialBalance).to.be.closeTo(JOB_REWARD, hre.ethers.parseEther("0.01"));

      const job = await gigEscrow.jobs(jobId);
      expect(job.completed).to.be.true;

      expect(await gigEscrow.reputation(worker.address)).to.equal(initialReputation + 1n);
    });

    it("Should revert with NotAuthorized when not worker", async function () {
      await expect(
        gigEscrow.connect(unauthorized).completeJob(jobId)
      ).to.be.revertedWithCustomError(gigEscrow, "NotAuthorized");
    });

    it("Should revert with JobAlreadyCompleted when already completed", async function () {
      await gigEscrow.connect(worker).completeJob(jobId);
      
      await expect(
        gigEscrow.connect(worker).completeJob(jobId)
      ).to.be.revertedWithCustomError(gigEscrow, "JobAlreadyCompleted");
    });
  });

  describe("cancelJob", function () {
    let jobId;
    const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;

    beforeEach(async function () {
      await gigEscrow.connect(employer).postJob(
        "Test Job",
        "Test Location",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );
      jobId = 1n;
    });

    it("Should cancel job and refund employer", async function () {
      const initialBalance = await hre.ethers.provider.getBalance(employer.address);

      await expect(
        gigEscrow.connect(employer).cancelJob(jobId)
      ).to.emit(gigEscrow, "JobCancelled")
        .withArgs(jobId, employer.address, JOB_REWARD);

      const finalBalance = await hre.ethers.provider.getBalance(employer.address);
      expect(finalBalance - initialBalance).to.be.closeTo(JOB_REWARD, hre.ethers.parseEther("0.01"));

      const job = await gigEscrow.jobs(jobId);
      expect(job.cancelled).to.be.true;
    });

    it("Should revert with NotAuthorized when not employer", async function () {
      await expect(
        gigEscrow.connect(unauthorized).cancelJob(jobId)
      ).to.be.revertedWithCustomError(gigEscrow, "NotAuthorized");
    });

    it("Should revert with JobAlreadyCompleted when job is completed", async function () {
      // Set reputation, place bid, accept, and complete
      await setReputation(gigEscrow, worker.address, MIN_REPUTATION);
      await gigEscrow.connect(worker).placeBid(jobId, 0n);
      await gigEscrow.connect(employer).acceptBid(jobId, worker.address);
      await gigEscrow.connect(worker).completeJob(jobId);
      
      await expect(
        gigEscrow.connect(employer).cancelJob(jobId)
      ).to.be.revertedWithCustomError(gigEscrow, "JobAlreadyCompleted");
    });

    it("Should revert with JobAlreadyCancelled when already cancelled", async function () {
      await gigEscrow.connect(employer).cancelJob(jobId);
      
      await expect(
        gigEscrow.connect(employer).cancelJob(jobId)
      ).to.be.revertedWithCustomError(gigEscrow, "JobAlreadyCancelled");
    });
  });

  describe("View functions", function () {
    let jobId;
    const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;

    beforeEach(async function () {
      await gigEscrow.connect(employer).postJob(
        "Test Job",
        "Test Location",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );
      jobId = 1n;
    });

    it("Should return job details via getJob", async function () {
      const job = await gigEscrow.getJob(jobId);
      expect(job.id).to.equal(jobId);
      expect(job.employer).to.equal(employer.address);
      expect(job.title).to.equal("Test Job");
      expect(job.location).to.equal("Test Location");
      expect(job.reward).to.equal(JOB_REWARD);
    });

    it("Should return empty bids array for job with no bids", async function () {
      const bids = await gigEscrow.getJobBids(jobId);
      expect(bids.length).to.equal(0);
    });

    it("Should return contract balance", async function () {
      const balance = await gigEscrow.getBalance();
      expect(balance).to.equal(JOB_REWARD);
    });

    it("Should return empty array for user with no jobs", async function () {
      const jobs = await gigEscrow.getUserJobs(unauthorized.address);
      expect(jobs.length).to.equal(0);
    });

    it("Should return empty array for worker with no jobs", async function () {
      const jobs = await gigEscrow.getWorkerJobs(worker.address);
      expect(jobs.length).to.equal(0);
    });
  });

  describe("Reputation system", function () {
    it("Should start with zero reputation", async function () {
      expect(await gigEscrow.reputation(worker.address)).to.equal(0n);
    });

    it("Should increase reputation when job is completed", async function () {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;
      
      await gigEscrow.connect(employer).postJob(
        "Test",
        "Test",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );

      // Set initial reputation
      await setReputation(gigEscrow, worker.address, MIN_REPUTATION);
      await gigEscrow.connect(worker).placeBid(1n, 0n);
      await gigEscrow.connect(employer).acceptBid(1n, worker.address);
      
      const initialRep = await gigEscrow.reputation(worker.address);
      await gigEscrow.connect(worker).completeJob(1n);
      
      expect(await gigEscrow.reputation(worker.address)).to.equal(initialRep + 1n);
    });
  });

  describe("assignWorkerDirectly", function () {
    let jobId;
    const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;

    beforeEach(async function () {
      await gigEscrow.connect(employer).postJob(
        "Direct Assignment Test",
        "Test Location",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );
      jobId = 1n;
    });

    it("Should assign worker directly by employer", async function () {
      await expect(
        gigEscrow.connect(employer).assignWorkerDirectly(jobId, worker.address)
      ).to.emit(gigEscrow, "JobAccepted")
        .withArgs(jobId, worker.address, employer.address);

      const job = await gigEscrow.getJob(jobId);
      expect(job.worker).to.equal(worker.address);
      expect(job.completed).to.equal(false);
      expect(job.cancelled).to.equal(false);
    });

    it("Should add job to worker's job list", async function () {
      await gigEscrow.connect(employer).assignWorkerDirectly(jobId, worker.address);
      
      const workerJobs = await gigEscrow.getWorkerJobs(worker.address);
      expect(workerJobs.length).to.equal(1);
      expect(workerJobs[0]).to.equal(jobId);
    });

    it("Should revert if not called by employer", async function () {
      await expect(
        gigEscrow.connect(unauthorized).assignWorkerDirectly(jobId, worker.address)
      ).to.be.revertedWithCustomError(gigEscrow, "NotAuthorized");
    });

    it("Should revert if job does not exist", async function () {
      await expect(
        gigEscrow.connect(employer).assignWorkerDirectly(999n, worker.address)
      ).to.be.revertedWithCustomError(gigEscrow, "JobNotFound");
    });

    it("Should revert if job already has a worker", async function () {
      await gigEscrow.connect(employer).assignWorkerDirectly(jobId, worker.address);
      
      await expect(
        gigEscrow.connect(employer).assignWorkerDirectly(jobId, worker2.address)
      ).to.be.revertedWithCustomError(gigEscrow, "JobAlreadyAssigned");
    });

    it("Should revert if job is cancelled", async function () {
      await gigEscrow.connect(employer).cancelJob(jobId);
      
      await expect(
        gigEscrow.connect(employer).assignWorkerDirectly(jobId, worker.address)
      ).to.be.revertedWithCustomError(gigEscrow, "JobAlreadyCancelled");
    });

    it("Should revert if worker address is zero", async function () {
      await expect(
        gigEscrow.connect(employer).assignWorkerDirectly(jobId, hre.ethers.ZeroAddress)
      ).to.be.revertedWithCustomError(gigEscrow, "InvalidAddress");
    });

    it("Should allow assigning worker without reputation requirement", async function () {
      // Worker has zero reputation
      expect(await gigEscrow.reputation(worker.address)).to.equal(0n);
      
      // Should still be able to assign directly
      await expect(
        gigEscrow.connect(employer).assignWorkerDirectly(jobId, worker.address)
      ).to.emit(gigEscrow, "JobAccepted");

      const job = await gigEscrow.getJob(jobId);
      expect(job.worker).to.equal(worker.address);
    });
  });

  describe("grantInitialReputation", function () {
    it("Should grant initial reputation by owner", async function () {
      const initialAmount = 10n;
      
      await expect(
        gigEscrow.connect(owner).grantInitialReputation(worker.address, initialAmount)
      ).to.emit(gigEscrow, "ReputationUpdated")
        .withArgs(worker.address, initialAmount);

      expect(await gigEscrow.reputation(worker.address)).to.equal(initialAmount);
    });

    it("Should increase reputation if worker already has some", async function () {
      const firstAmount = 5n;
      const secondAmount = 10n;
      
      await gigEscrow.connect(owner).grantInitialReputation(worker.address, firstAmount);
      expect(await gigEscrow.reputation(worker.address)).to.equal(firstAmount);
      
      await gigEscrow.connect(owner).grantInitialReputation(worker.address, secondAmount);
      expect(await gigEscrow.reputation(worker.address)).to.equal(firstAmount + secondAmount);
    });

    it("Should revert if not called by owner", async function () {
      await expect(
        gigEscrow.connect(employer).grantInitialReputation(worker.address, 10n)
      ).to.be.revertedWithCustomError(gigEscrow, "Unauthorized");
    });

    it("Should revert if user address is zero", async function () {
      await expect(
        gigEscrow.connect(owner).grantInitialReputation(hre.ethers.ZeroAddress, 10n)
      ).to.be.revertedWithCustomError(gigEscrow, "InvalidAddress");
    });

    it("Should allow worker to bid after receiving initial reputation", async function () {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 7n * 86400n;
      
      // Grant initial reputation
      await gigEscrow.connect(owner).grantInitialReputation(worker.address, MIN_REPUTATION);
      
      // Post a job
      await gigEscrow.connect(employer).postJob(
        "Test Job",
        "Test Location",
        JOB_REWARD,
        deadline,
        { value: JOB_REWARD }
      );
      
      // Worker should now be able to place a bid
      await expect(
        gigEscrow.connect(worker).placeBid(1n, 0n)
      ).to.emit(gigEscrow, "BidPlaced");
    });
  });
});


