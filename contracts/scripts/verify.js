// contracts/scripts/verify.js - Contract Verification Script for Somnia Network
import hre from "hardhat";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log("🔍 Verificando contratos en Somnia Explorer...\n");

  // Leer información del despliegue
  const deploymentPath = join(__dirname, "..", "deployment-info.json");
  const deploymentInfo = JSON.parse(readFileSync(deploymentPath, "utf-8"));

  const contracts = deploymentInfo.contracts;
  const network = deploymentInfo.network;

  console.log(`📋 Red: ${network} (Chain ID: ${deploymentInfo.chainId})\n`);

  // Verificar GigEscrow
  console.log("1️⃣ Verificando GigEscrow...");
  try {
    await hre.verify.verify({
      address: contracts.gigEscrow,
      constructorArguments: [],
      contract: "contracts/src/GigEscrow.sol:GigEscrow",
    });
    console.log("   ✅ GigEscrow verificado exitosamente!");
    console.log(`   Explorer: ${deploymentInfo.explorers.gigEscrow}\n`);
  } catch (error) {
    if (error.message && (error.message.includes("Already Verified") || error.message.includes("already verified"))) {
      console.log("   ✅ GigEscrow ya está verificado\n");
    } else {
      console.error("   ❌ Error verificando GigEscrow:", error.message || error);
    }
  }

  // Verificar ReputationToken (requiere dirección de GigEscrow como argumento)
  console.log("2️⃣ Verificando ReputationToken...");
  try {
    await hre.verify.verify({
      address: contracts.reputationToken,
      constructorArguments: [contracts.gigEscrow],
      contract: "contracts/src/ReputationToken.sol:ReputationToken",
    });
    console.log("   ✅ ReputationToken verificado exitosamente!");
    console.log(`   Explorer: ${deploymentInfo.explorers.reputationToken}\n`);
  } catch (error) {
    if (error.message && (error.message.includes("Already Verified") || error.message.includes("already verified"))) {
      console.log("   ✅ ReputationToken ya está verificado\n");
    } else {
      console.error("   ❌ Error verificando ReputationToken:", error.message || error);
    }
  }

  // Verificar StakingPool (requiere dirección de GigEscrow como argumento)
  console.log("3️⃣ Verificando StakingPool...");
  try {
    await hre.verify.verify({
      address: contracts.stakingPool,
      constructorArguments: [contracts.gigEscrow],
      contract: "contracts/src/StakingPool.sol:StakingPool",
    });
    console.log("   ✅ StakingPool verificado exitosamente!");
    console.log(`   Explorer: ${deploymentInfo.explorers.stakingPool}\n`);
  } catch (error) {
    if (error.message && (error.message.includes("Already Verified") || error.message.includes("already verified"))) {
      console.log("   ✅ StakingPool ya está verificado\n");
    } else {
      console.error("   ❌ Error verificando StakingPool:", error.message || error);
    }
  }

  console.log("✅ ==========================================");
  console.log("✅ Verificación completada!");
  console.log("✅ ==========================================");
  console.log("\n📊 Resumen:");
  console.log(`   GigEscrow: ${contracts.gigEscrow}`);
  console.log(`   ReputationToken: ${contracts.reputationToken}`);
  console.log(`   StakingPool: ${contracts.stakingPool}`);
  console.log("\n🌐 Explorers:");
  console.log(`   ${deploymentInfo.explorers.gigEscrow}`);
  console.log(`   ${deploymentInfo.explorers.reputationToken}`);
  console.log(`   ${deploymentInfo.explorers.stakingPool}`);
}

main()
  .then(() => {
    console.log("\n🎉 Proceso de verificación finalizado!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error durante la verificación:");
    console.error(error);
    process.exit(1);
  });

