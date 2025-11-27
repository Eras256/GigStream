// SPDX-License-Identifier: MIT
// contracts/src/StakingPool.sol - Staking Pool for GigStream Workers
// Allows workers to stake tokens to increase trust and earn rewards
pragma solidity ^0.8.29;

/**
 * @title StakingPool
 * @dev Staking contract for GigStream workers to increase trust
 * @notice Optimized for Somnia Network's high-throughput EVM
 */
contract StakingPool {
    struct Stake {
        uint256 amount;
        uint256 timestamp;
        uint256 unlockTime;
        bool active;
    }

    mapping(address => Stake) public stakes;
    mapping(address => uint256) public totalStaked;
    uint256 public totalStakedAmount;
    
    uint256 public constant MIN_STAKE = 0.1 ether; // Minimum stake amount
    uint256 public constant STAKING_DURATION = 30 days; // 30 days lock period
    uint256 public constant REWARD_RATE = 5; // 5% annual reward
    
    address public immutable gigEscrow;
    address public owner;
    
    event Staked(address indexed user, uint256 amount, uint256 unlockTime);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    
    error Unauthorized();
    error InvalidAmount();
    error InsufficientStake();
    error StakeLocked();
    error NoStake();
    error InvalidAddress();
    error TransferFailed();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier onlyGigEscrow() {
        if (msg.sender != gigEscrow) revert Unauthorized();
        _;
    }

    /**
     * @dev Constructor
     * @param _gigEscrow Address of the GigEscrow contract
     */
    constructor(address _gigEscrow) {
        if (_gigEscrow == address(0)) revert InvalidAddress();
        gigEscrow = _gigEscrow;
        owner = msg.sender;
    }

    /**
     * @dev Stake tokens to increase trust
     */
    function stake() external payable {
        if (msg.value < MIN_STAKE) revert InvalidAmount();
        if (stakes[msg.sender].active) revert InvalidAmount(); // Can only have one active stake
        
        uint256 unlockTime = block.timestamp + STAKING_DURATION;
        
        stakes[msg.sender] = Stake({
            amount: msg.value,
            timestamp: block.timestamp,
            unlockTime: unlockTime,
            active: true
        });
        
        totalStaked[msg.sender] += msg.value;
        totalStakedAmount += msg.value;
        
        emit Staked(msg.sender, msg.value, unlockTime);
    }

    /**
     * @dev Unstake tokens after lock period
     */
    function unstake() external {
        Stake storage userStake = stakes[msg.sender];
        if (!userStake.active) revert NoStake();
        if (block.timestamp < userStake.unlockTime) revert StakeLocked();
        
        uint256 amount = userStake.amount;
        uint256 reward = calculateReward(msg.sender);
        uint256 totalAmount = amount + reward;
        
        // Reset stake
        delete stakes[msg.sender];
        totalStaked[msg.sender] -= amount;
        totalStakedAmount -= amount;
        
        // Transfer funds
        (bool success, ) = payable(msg.sender).call{value: totalAmount}("");
        if (!success) revert TransferFailed();
        
        emit Unstaked(msg.sender, amount);
        if (reward > 0) {
            emit RewardClaimed(msg.sender, reward);
        }
    }

    /**
     * @dev Calculate reward for a staker
     */
    function calculateReward(address _staker) public view returns (uint256) {
        Stake memory userStake = stakes[_staker];
        if (!userStake.active) return 0;
        
        uint256 stakingTime = block.timestamp - userStake.timestamp;
        if (stakingTime < STAKING_DURATION) return 0;
        
        // Simple reward calculation: 5% annual
        uint256 reward = (userStake.amount * REWARD_RATE * stakingTime) / (100 * 365 days);
        return reward;
    }

    /**
     * @dev Get stake information for a user
     */
    function getStake(address _user) external view returns (Stake memory) {
        return stakes[_user];
    }

    /**
     * @dev Check if user has active stake
     */
    function hasActiveStake(address _user) external view returns (bool) {
        return stakes[_user].active;
    }

    /**
     * @dev Get total staked amount
     */
    function getTotalStaked() external view returns (uint256) {
        return totalStakedAmount;
    }

    /**
     * @dev Receive function to accept native tokens
     */
    receive() external payable {}
}

