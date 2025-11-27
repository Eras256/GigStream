// SPDX-License-Identifier: MIT
// contracts/script/Deploy.s.sol - Deployment Script for Somnia Network
pragma solidity ^0.8.29;

import {Script, console} from "forge-std/Script.sol";
import {GigEscrow} from "../src/GigEscrow.sol";

/**
 * @title DeployGigEscrow
 * @dev Deployment script for GigEscrow contract on Somnia Network
 * @notice Run with: forge script script/Deploy.s.sol --rpc-url $SOMNIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify
 */
contract DeployGigEscrow is Script {
    function run() external returns (GigEscrow) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        console.log("Deploying GigEscrow to Somnia Network...");
        console.log("Deployer address:", vm.addr(deployerPrivateKey));
        console.log("Deployer balance:", vm.addr(deployerPrivateKey).balance);
        
        vm.startBroadcast(deployerPrivateKey);
        
        GigEscrow escrow = new GigEscrow();
        
        vm.stopBroadcast();
        
        console.log("==========================================");
        console.log("GigEscrow deployed successfully!");
        console.log("Contract address:", address(escrow));
        console.log("Network: Somnia Testnet (Chain ID: 50312)");
        console.log("Explorer: https://somnia-testnet.explorer.somnia.network/address/", address(escrow));
        console.log("==========================================");
        
        // Save deployment info
        string memory deploymentInfo = string(abi.encodePacked(
            "GigEscrow deployed at: ",
            vm.toString(address(escrow)),
            "\nNetwork: Somnia Testnet\nChain ID: 50312\n"
        ));
        vm.writeFile("./deployment-info.txt", deploymentInfo);
        
        return escrow;
    }
}

