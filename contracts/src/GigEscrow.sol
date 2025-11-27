// SPDX-License-Identifier: MIT
// contracts/src/GigEscrow.sol - GigStream Escrow Contract optimized for Somnia Network
// Optimized for Somnia L1 EVM-compatible with high TPS and sub-second finality
pragma solidity ^0.8.29;

/**
 * @title GigEscrow
 * @dev Escrow contract for GigStream MX marketplace on Somnia Network
 * @notice Optimized for Somnia's high-throughput EVM with gas-efficient operations
 */
contract GigEscrow {
    struct Job {
        uint256 id;
        address employer;
        string title;
        string location;
        uint256 reward;
        uint256 deadline;
        address worker;
        bool completed;
        bool cancelled;
        uint256 createdAt;
    }

    struct Bid {
        address worker;
        uint256 amount;
        uint256 timestamp;
        bool accepted;
    }

    mapping(uint256 => Job) public jobs;
    mapping(uint256 => Bid[]) public jobBids;
    mapping(address => uint256) public reputation;
    mapping(address => uint256[]) public userJobs;
    mapping(address => uint256[]) public workerJobs;
    uint256 public jobCounter;
    
    uint256 public constant MIN_REPUTATION = 10;
    uint256 public constant MIN_DEADLINE_OFFSET = 1 days;

    event JobPosted(
        uint256 indexed jobId,
        address indexed employer,
        string title,
        uint256 reward,
        uint256 deadline
    );
    event BidPlaced(
        uint256 indexed jobId,
        address indexed worker,
        uint256 bid,
        uint256 timestamp
    );
    event JobAccepted(
        uint256 indexed jobId,
        address indexed worker,
        address indexed employer
    );
    event JobCompleted(
        uint256 indexed jobId,
        address indexed worker,
        uint256 reward
    );
    event JobCancelled(
        uint256 indexed jobId,
        address indexed employer,
        uint256 refundAmount
    );
    event ReputationUpdated(
        address indexed user,
        uint256 newReputation
    );

    error InsufficientPayment();
    error InvalidDeadline();
    error LowReputation();
    error JobNotFound();
    error JobAlreadyAssigned();
    error JobAlreadyCancelled();
    error JobAlreadyCompleted();
    error NotAuthorized();
    error TransferFailed();

    /**
     * @dev Post a new job with escrow payment
     * @param _title Job title
     * @param _location Job location
     * @param _reward Reward amount in native token (STT on testnet, SOMI on mainnet)
     * @param _deadline Job deadline timestamp
     */
    function postJob(
        string memory _title,
        string memory _location,
        uint256 _reward,
        uint256 _deadline
    ) external payable {
        if (msg.value < _reward) revert InsufficientPayment();
        if (_deadline <= block.timestamp + MIN_DEADLINE_OFFSET) revert InvalidDeadline();

        jobCounter++;
        uint256 jobId = jobCounter;
        
        jobs[jobId] = Job({
            id: jobId,
            employer: msg.sender,
            title: _title,
            location: _location,
            reward: _reward,
            deadline: _deadline,
            worker: address(0),
            completed: false,
            cancelled: false,
            createdAt: block.timestamp
        });

        userJobs[msg.sender].push(jobId);

        emit JobPosted(jobId, msg.sender, _title, _reward, _deadline);
    }

    /**
     * @dev Place a bid on a job
     * @param _jobId Job ID to bid on
     * @param _bid Bid amount (optional, can be 0)
     */
    function placeBid(uint256 _jobId, uint256 _bid) external {
        Job storage job = jobs[_jobId];
        if (job.id == 0) revert JobNotFound();
        if (job.worker != address(0)) revert JobAlreadyAssigned();
        if (job.cancelled) revert JobAlreadyCancelled();
        if (reputation[msg.sender] < MIN_REPUTATION) revert LowReputation();

        jobBids[_jobId].push(Bid({
            worker: msg.sender,
            amount: _bid,
            timestamp: block.timestamp,
            accepted: false
        }));

        emit BidPlaced(_jobId, msg.sender, _bid, block.timestamp);
    }

    /**
     * @dev Accept a bid for a job
     * @param _jobId Job ID
     * @param _worker Worker address to accept
     */
    function acceptBid(uint256 _jobId, address _worker) external {
        Job storage job = jobs[_jobId];
        if (job.id == 0) revert JobNotFound();
        if (job.employer != msg.sender) revert NotAuthorized();
        if (job.worker != address(0)) revert JobAlreadyAssigned();
        if (job.cancelled) revert JobAlreadyCancelled();

        job.worker = _worker;
        workerJobs[_worker].push(_jobId);

        // Mark bid as accepted
        Bid[] storage bids = jobBids[_jobId];
        for (uint256 i = 0; i < bids.length; i++) {
            if (bids[i].worker == _worker) {
                bids[i].accepted = true;
                break;
            }
        }

        emit JobAccepted(_jobId, _worker, msg.sender);
    }

    /**
     * @dev Complete a job and release escrow payment
     * @param _jobId Job ID to complete
     */
    function completeJob(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        if (job.id == 0) revert JobNotFound();
        if (job.worker != msg.sender) revert NotAuthorized();
        if (job.completed) revert JobAlreadyCompleted();
        if (job.cancelled) revert JobAlreadyCancelled();

        job.completed = true;
        reputation[msg.sender] += 1;

        uint256 reward = job.reward;
        (bool success, ) = payable(msg.sender).call{value: reward}("");
        if (!success) revert TransferFailed();

        emit JobCompleted(_jobId, msg.sender, reward);
        emit ReputationUpdated(msg.sender, reputation[msg.sender]);
    }

    /**
     * @dev Cancel a job and refund employer
     * @param _jobId Job ID to cancel
     */
    function cancelJob(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        if (job.id == 0) revert JobNotFound();
        if (job.employer != msg.sender) revert NotAuthorized();
        if (job.completed) revert JobAlreadyCompleted();
        if (job.cancelled) revert JobAlreadyCancelled();

        job.cancelled = true;

        uint256 refundAmount = job.reward;
        (bool success, ) = payable(msg.sender).call{value: refundAmount}("");
        if (!success) revert TransferFailed();

        emit JobCancelled(_jobId, msg.sender, refundAmount);
    }

    /**
     * @dev Get job details
     * @param _jobId Job ID
     * @return Job struct
     */
    function getJob(uint256 _jobId) external view returns (Job memory) {
        return jobs[_jobId];
    }

    /**
     * @dev Get all bids for a job
     * @param _jobId Job ID
     * @return Array of Bid structs
     */
    function getJobBids(uint256 _jobId) external view returns (Bid[] memory) {
        return jobBids[_jobId];
    }

    /**
     * @dev Get user's job IDs
     * @param _user User address
     * @return Array of job IDs
     */
    function getUserJobs(address _user) external view returns (uint256[] memory) {
        return userJobs[_user];
    }

    /**
     * @dev Get worker's job IDs
     * @param _worker Worker address
     * @return Array of job IDs
     */
    function getWorkerJobs(address _worker) external view returns (uint256[] memory) {
        return workerJobs[_worker];
    }

    /**
     * @dev Get contract balance
     * @return Contract balance in wei
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Receive function to accept native tokens
     */
    receive() external payable {}
}

