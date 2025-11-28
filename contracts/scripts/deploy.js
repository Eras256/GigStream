import hre from "hardhat";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "dotenv";
import { join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
config({ path: join(__dirname, "..", "..", ".env.local") });

async function main() {
  console.log("🚀 Desplegando GigEscrow a Somnia Network...\n");

  // Obtener RPC URL directamente de las variables de entorno
  // URLs oficiales de Somnia Testnet según documentación Nov 2025:
  // - https://dream-rpc.somnia.network (testnet)
  // - https://rpc.somnia.network (mainnet)
  const rpcUrl = process.env.SOMNIA_RPC_URL || process.env.NEXT_PUBLIC_SOMNIA_RPC_URL || "https://dream-rpc.somnia.network";
  console.log("   RPC URL:", rpcUrl);
  
  // Crear provider con configuración específica para Somnia
  const provider = new ethers.JsonRpcProvider(rpcUrl, {
    name: "somnia-shannon-testnet",
    chainId: 50312,
  });
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("❌ PRIVATE_KEY no está configurado en .env.local");
  }
  const wallet = new ethers.Wallet(privateKey.trim(), provider);
  const deployerAddress = wallet.address;
  const balance = await provider.getBalance(deployerAddress);

  console.log("📋 Información del Deployer:");
  console.log("   Dirección:", deployerAddress);
  console.log("   Balance:", ethers.formatEther(balance), "ETH");
  console.log("   Red: Somnia Testnet (Chain ID: 50312)\n");

  if (balance === 0n) {
    throw new Error("❌ El deployer no tiene fondos. Asegúrate de tener tokens en la wallet.");
  }

  // Desplegar GigEscrow primero
  console.log("📦 Desplegando contrato GigEscrow...");
  const gigEscrowArtifact = await hre.artifacts.readArtifact("GigEscrow");
  const gigEscrowFactory = new ethers.ContractFactory(gigEscrowArtifact.abi, gigEscrowArtifact.bytecode, wallet);
  const escrow = await gigEscrowFactory.deploy();
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log("   ✅ GigEscrow desplegado en:", escrowAddress);

  // Desplegar ReputationToken (requiere dirección de GigEscrow)
  console.log("\n📦 Desplegando contrato ReputationToken...");
  const reputationArtifact = await hre.artifacts.readArtifact("ReputationToken");
  const reputationFactory = new ethers.ContractFactory(reputationArtifact.abi, reputationArtifact.bytecode, wallet);
  const reputationToken = await reputationFactory.deploy(escrowAddress);
  await reputationToken.waitForDeployment();
  const reputationAddress = await reputationToken.getAddress();
  console.log("   ✅ ReputationToken desplegado en:", reputationAddress);

  // Desplegar StakingPool (requiere dirección de GigEscrow)
  console.log("\n📦 Desplegando contrato StakingPool...");
  const stakingArtifact = await hre.artifacts.readArtifact("StakingPool");
  const stakingFactory = new ethers.ContractFactory(stakingArtifact.abi, stakingArtifact.bytecode, wallet);
  const stakingPool = await stakingFactory.deploy(escrowAddress);
  await stakingPool.waitForDeployment();
  const stakingAddress = await stakingPool.getAddress();
  console.log("   ✅ StakingPool desplegado en:", stakingAddress);

  console.log("\n✅ ==========================================");
  console.log("✅ Todos los contratos desplegados exitosamente!");
  console.log("✅ ==========================================");
  console.log("   GigEscrow:", escrowAddress);
  console.log("   ReputationToken:", reputationAddress);
  console.log("   StakingPool:", stakingAddress);
  console.log("   Red: Somnia Testnet");
  console.log("   Chain ID: 50312");
  console.log("   Explorer: https://shannon-explorer.somnia.network");
  console.log("✅ ==========================================\n");

  // Guardar información del despliegue
  const deploymentInfo = {
    contracts: {
      gigEscrow: escrowAddress,
      reputationToken: reputationAddress,
      stakingPool: stakingAddress,
    },
    network: "Somnia Testnet",
    chainId: 50312,
    deployer: deployerAddress,
    timestamp: new Date().toISOString(),
    explorers: {
      gigEscrow: `https://shannon-explorer.somnia.network/address/${escrowAddress}`,
      reputationToken: `https://shannon-explorer.somnia.network/address/${reputationAddress}`,
      stakingPool: `https://shannon-explorer.somnia.network/address/${stakingAddress}`,
    },
  };

  const deploymentPath = path.join(__dirname, "..", "deployment-info.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Información guardada en:", deploymentPath);

  // También guardar en formato texto para compatibilidad
  const deploymentText = `GigStream MX Contracts Deployment
==========================================
Network: Somnia Testnet
Chain ID: 50312
Deployer: ${deployerAddress}
Timestamp: ${deploymentInfo.timestamp}

Contracts:
----------
GigEscrow: ${escrowAddress}
Explorer: ${deploymentInfo.explorers.gigEscrow}

ReputationToken: ${reputationAddress}
Explorer: ${deploymentInfo.explorers.reputationToken}

StakingPool: ${stakingAddress}
Explorer: ${deploymentInfo.explorers.stakingPool}
==========================================
`;
  const deploymentTextPath = path.join(__dirname, "..", "deployment-info.txt");
  fs.writeFileSync(deploymentTextPath, deploymentText);
  console.log("💾 Información guardada en:", deploymentTextPath);

  return {
    gigEscrow: escrowAddress,
    reputationToken: reputationAddress,
    stakingPool: stakingAddress,
  };
}

main()
  .then((address) => {
    console.log("\n🎉 Despliegue completado!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error durante el despliegue:");
    console.error(error);
    process.exit(1);
  });

