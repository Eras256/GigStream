// contracts/scripts/verify-direct.js - Direct Contract Verification via Somnia Explorer API
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
config({ path: join(__dirname, "..", "..", ".env.local") });

const API_KEY = process.env.SOMNIA_EXPLORER_API_KEY || "R3HXHXJUA2J66MMX5NY2QP21KXV3MJR7HM";
const API_URL = "https://verify-contract.xangle.io/somnia/api";

// Leer información del despliegue
const deploymentPath = join(__dirname, "..", "deployment-info.json");
const deploymentInfo = JSON.parse(readFileSync(deploymentPath, "utf-8"));

const contracts = deploymentInfo.contracts;

// Leer código fuente de los contratos
const gigEscrowSource = readFileSync(join(__dirname, "..", "src", "GigEscrow.sol"), "utf-8");
const reputationTokenSource = readFileSync(join(__dirname, "..", "src", "ReputationToken.sol"), "utf-8");
const stakingPoolSource = readFileSync(join(__dirname, "..", "src", "StakingPool.sol"), "utf-8");

async function verifyContract(contractAddress, contractName, constructorArgs = [], sourceCode) {
  const verificationData = {
    apikey: API_KEY,
    module: "contract",
    action: "verifysourcecode",
    contractaddress: contractAddress,
    sourceCode: sourceCode,
    codeformat: "solidity-single-file",
    contractname: contractName,
    compilerversion: "v0.8.29+commit.ab7405c0",
    optimizationUsed: "1",
    runs: "200",
    constructorArguements: constructorArgs.length > 0 ? constructorArgs.map(arg => arg.replace("0x", "")).join("") : "",
  };

  try {
    console.log(`   Enviando solicitud de verificación para ${contractName}...`);
    
    const formData = new URLSearchParams();
    Object.entries(verificationData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();
    
    if (result.status === "1" || result.result) {
      return {
        success: true,
        guid: result.result || result.guid,
        message: result.message || "Verification submitted successfully",
      };
    } else {
      return {
        success: false,
        message: result.message || result.result || "Unknown error",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
}

async function main() {
  console.log("🔍 Verificando contratos en Somnia Explorer...\n");
  console.log(`📋 Red: ${deploymentInfo.network} (Chain ID: ${deploymentInfo.chainId})`);
  console.log(`🔑 API Key: ${API_KEY.substring(0, 10)}...`);
  console.log(`🌐 API URL: ${API_URL}\n`);

  // Verificar GigEscrow
  console.log("1️⃣ Verificando GigEscrow...");
  const gigEscrowResult = await verifyContract(
    contracts.gigEscrow,
    "GigEscrow",
    [],
    gigEscrowSource
  );
  
  if (gigEscrowResult.success) {
    console.log("   ✅ Solicitud de verificación enviada!");
    console.log(`   GUID: ${gigEscrowResult.guid}`);
    console.log(`   Explorer: https://shannon-explorer.somnia.network/address/${contracts.gigEscrow}\n`);
  } else {
    console.error(`   ❌ Error: ${gigEscrowResult.message}\n`);
  }

  // Verificar ReputationToken
  console.log("2️⃣ Verificando ReputationToken...");
  const reputationTokenResult = await verifyContract(
    contracts.reputationToken,
    "ReputationToken",
    [contracts.gigEscrow],
    reputationTokenSource
  );
  
  if (reputationTokenResult.success) {
    console.log("   ✅ Solicitud de verificación enviada!");
    console.log(`   GUID: ${reputationTokenResult.guid}`);
    console.log(`   Explorer: https://shannon-explorer.somnia.network/address/${contracts.reputationToken}\n`);
  } else {
    console.error(`   ❌ Error: ${reputationTokenResult.message}\n`);
  }

  // Verificar StakingPool
  console.log("3️⃣ Verificando StakingPool...");
  const stakingPoolResult = await verifyContract(
    contracts.stakingPool,
    "StakingPool",
    [contracts.gigEscrow],
    stakingPoolSource
  );
  
  if (stakingPoolResult.success) {
    console.log("   ✅ Solicitud de verificación enviada!");
    console.log(`   GUID: ${stakingPoolResult.guid}`);
    console.log(`   Explorer: https://shannon-explorer.somnia.network/address/${contracts.stakingPool}\n`);
  } else {
    console.error(`   ❌ Error: ${stakingPoolResult.message}\n`);
  }

  console.log("✅ ==========================================");
  console.log("✅ Proceso de verificación completado!");
  console.log("✅ ==========================================");
  console.log("\n📊 Resumen:");
  console.log(`   GigEscrow: ${contracts.gigEscrow}`);
  console.log(`   ReputationToken: ${contracts.reputationToken}`);
  console.log(`   StakingPool: ${contracts.stakingPool}`);
  console.log("\n⏳ La verificación puede tardar unos minutos.");
  console.log("   Revisa el estado en los explorers:\n");
  console.log(`   ${deploymentInfo.explorers.gigEscrow}`);
  console.log(`   ${deploymentInfo.explorers.reputationToken}`);
  console.log(`   ${deploymentInfo.explorers.stakingPool}`);
}

main()
  .then(() => {
    console.log("\n🎉 Verificación completada!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error durante la verificación:");
    console.error(error);
    process.exit(1);
  });

