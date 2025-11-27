// contracts/scripts/verify-api.js - Contract Verification via Somnia Explorer API
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
config({ path: join(__dirname, "..", "..", ".env.local") });

const API_KEY = process.env.SOMNIA_EXPLORER_API_KEY || "R3HXHXJUA2J66MMX5NY2QP21KXV3MJR7HM";
const API_URL = "https://somnia-testnet.explorer.somnia.network/api";

async function verifyContract(contractAddress, contractName, constructorArgs = [], sourceCode, compilerVersion = "v0.8.29+commit.ab7405c0", optimizationRuns = 200) {
  const verificationData = {
    apikey: API_KEY,
    module: "contract",
    action: "verifysourcecode",
    contractaddress: contractAddress,
    sourceCode: sourceCode,
    codeformat: "solidity-single-file",
    contractname: contractName,
    compilerversion: compilerVersion,
    optimizationUsed: 1,
    runs: optimizationRuns,
    constructorArguements: constructorArgs.length > 0 ? constructorArgs.map(arg => arg.replace("0x", "")).join("") : "",
  };

  try {
    const response = await fetch(`${API_URL}?${new URLSearchParams(verificationData)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error verificando contrato: ${error.message}`);
  }
}

async function main() {
  console.log("🔍 Verificando contratos en Somnia Explorer usando API...\n");
  console.log(`   API Key: ${API_KEY.substring(0, 10)}...`);
  console.log(`   API URL: ${API_URL}\n`);

  // Leer información del despliegue
  const deploymentPath = join(__dirname, "..", "deployment-info.json");
  const deploymentInfo = JSON.parse(readFileSync(deploymentPath, "utf-8"));

  const contracts = deploymentInfo.contracts;

  // Leer código fuente de los contratos
  const gigEscrowSource = readFileSync(join(__dirname, "..", "src", "GigEscrow.sol"), "utf-8");
  const reputationTokenSource = readFileSync(join(__dirname, "..", "src", "ReputationToken.sol"), "utf-8");
  const stakingPoolSource = readFileSync(join(__dirname, "..", "src", "StakingPool.sol"), "utf-8");

  console.log("📋 Red: Somnia Testnet (Chain ID: 50312)\n");

  // Verificar GigEscrow
  console.log("1️⃣ Verificando GigEscrow...");
  try {
    const result = await verifyContract(
      contracts.gigEscrow,
      "GigEscrow",
      [],
      gigEscrowSource
    );
    
    if (result.status === "1" || result.result) {
      console.log("   ✅ Solicitud de verificación enviada!");
      console.log(`   GUID: ${result.result || result.guid}`);
      console.log(`   Explorer: ${deploymentInfo.explorers.gigEscrow}\n`);
      console.log("   ⏳ La verificación puede tardar unos minutos. Revisa el explorer.\n");
    } else {
      console.error("   ❌ Error:", result.message || result.result);
    }
  } catch (error) {
    console.error("   ❌ Error verificando GigEscrow:", error.message);
  }

  // Verificar ReputationToken
  console.log("2️⃣ Verificando ReputationToken...");
  try {
    const result = await verifyContract(
      contracts.reputationToken,
      "ReputationToken",
      [contracts.gigEscrow],
      reputationTokenSource
    );
    
    if (result.status === "1" || result.result) {
      console.log("   ✅ Solicitud de verificación enviada!");
      console.log(`   GUID: ${result.result || result.guid}`);
      console.log(`   Explorer: ${deploymentInfo.explorers.reputationToken}\n`);
      console.log("   ⏳ La verificación puede tardar unos minutos. Revisa el explorer.\n");
    } else {
      console.error("   ❌ Error:", result.message || result.result);
    }
  } catch (error) {
    console.error("   ❌ Error verificando ReputationToken:", error.message);
  }

  // Verificar StakingPool
  console.log("3️⃣ Verificando StakingPool...");
  try {
    const result = await verifyContract(
      contracts.stakingPool,
      "StakingPool",
      [contracts.gigEscrow],
      stakingPoolSource
    );
    
    if (result.status === "1" || result.result) {
      console.log("   ✅ Solicitud de verificación enviada!");
      console.log(`   GUID: ${result.result || result.guid}`);
      console.log(`   Explorer: ${deploymentInfo.explorers.stakingPool}\n`);
      console.log("   ⏳ La verificación puede tardar unos minutos. Revisa el explorer.\n");
    } else {
      console.error("   ❌ Error:", result.message || result.result);
    }
  } catch (error) {
    console.error("   ❌ Error verificando StakingPool:", error.message);
  }

  console.log("✅ ==========================================");
  console.log("✅ Proceso de verificación completado!");
  console.log("✅ ==========================================");
  console.log("\n📊 Resumen de contratos:");
  console.log(`   GigEscrow: ${contracts.gigEscrow}`);
  console.log(`   ReputationToken: ${contracts.reputationToken}`);
  console.log(`   StakingPool: ${contracts.stakingPool}`);
  console.log("\n🌐 Verifica el estado en los explorers:");
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

