// SPDX-License-Identifier: MIT
// contracts/src/ReputationToken.sol - Reputation Token for GigStream MX
// ERC-20 token representing reputation points that can be earned and transferred
pragma solidity ^0.8.29;

/**
 * @title ReputationToken
 * @dev ERC-20 token for reputation points in GigStream marketplace
 * @notice Optimized for Somnia Network's high-throughput EVM
 */
contract ReputationToken {
    string public constant name = "GigStream Reputation Token";
    string public constant symbol = "GST";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    address public immutable gigEscrow;
    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event ReputationMinted(address indexed to, uint256 amount, string reason);
    event ReputationBurned(address indexed from, uint256 amount, string reason);

    error Unauthorized();
    error InsufficientBalance();
    error InsufficientAllowance();
    error InvalidAddress();
    error OnlyGigEscrow();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier onlyGigEscrow() {
        if (msg.sender != gigEscrow) revert OnlyGigEscrow();
        _;
    }

    /**
     * @dev Constructor sets the GigEscrow contract address
     * @param _gigEscrow Address of the GigEscrow contract
     */
    constructor(address _gigEscrow) {
        if (_gigEscrow == address(0)) revert InvalidAddress();
        gigEscrow = _gigEscrow;
        owner = msg.sender;
    }

    /**
     * @dev Mint reputation tokens (only callable by GigEscrow)
     * @param _to Address to mint tokens to
     * @param _amount Amount of tokens to mint
     * @param _reason Reason for minting (e.g., "Job completed")
     */
    function mint(address _to, uint256 _amount, string memory _reason) external onlyGigEscrow {
        if (_to == address(0)) revert InvalidAddress();
        
        balanceOf[_to] += _amount;
        totalSupply += _amount;
        
        emit Transfer(address(0), _to, _amount);
        emit ReputationMinted(_to, _amount, _reason);
    }

    /**
     * @dev Burn reputation tokens
     * @param _from Address to burn tokens from
     * @param _amount Amount of tokens to burn
     * @param _reason Reason for burning
     */
    function burn(address _from, uint256 _amount, string memory _reason) external {
        if (_from != msg.sender && allowance[_from][msg.sender] < _amount) {
            revert InsufficientAllowance();
        }
        
        if (balanceOf[_from] < _amount) revert InsufficientBalance();
        
        if (_from != msg.sender) {
            allowance[_from][msg.sender] -= _amount;
        }
        
        balanceOf[_from] -= _amount;
        totalSupply -= _amount;
        
        emit Transfer(_from, address(0), _amount);
        emit ReputationBurned(_from, _amount, _reason);
    }

    /**
     * @dev Transfer tokens
     */
    function transfer(address _to, uint256 _value) external returns (bool) {
        if (balanceOf[msg.sender] < _value) revert InsufficientBalance();
        if (_to == address(0)) revert InvalidAddress();
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /**
     * @dev Transfer tokens from another address
     */
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool) {
        if (balanceOf[_from] < _value) revert InsufficientBalance();
        if (allowance[_from][msg.sender] < _value) revert InsufficientAllowance();
        if (_to == address(0)) revert InvalidAddress();
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }

    /**
     * @dev Approve spender
     */
    function approve(address _spender, uint256 _value) external returns (bool) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * @dev Get reputation score for an address
     */
    function getReputation(address _user) external view returns (uint256) {
        return balanceOf[_user];
    }
}

