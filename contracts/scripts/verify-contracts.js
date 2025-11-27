// contracts/scripts/verify-contracts.js - Contract Verification for Somnia Explorer
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
config({ path: join(__dirname, "..", "..", ".env.local") });

const API_KEY = process.env.SOMNIA_EXPLORER_API_KEY || "R3HXHXJUA2J66MMX5NY2QP21KXV3MJR7HM";
const EXPLORER_BASE = "https://shannon-explorer.somnia.network";

// Leer información del despliegue
const deploymentPath = join(__dirname, "..", "deployment-info.json");
const deploymentInfo = JSON.parse(readFileSync(deploymentPath, "utf-8"));

const contracts = deploymentInfo.contracts;

console.log("🔍 Verificación de Contratos en Somnia Explorer");
console.log("================================================\n");
console.log(`📋 Red: ${deploymentInfo.network} (Chain ID: ${deploymentInfo.chainId})`);
console.log(`🔑 API Key: ${API_KEY.substring(0, 10)}...\n`);

console.log("📊 Contratos a verificar:\n");
console.log("1️⃣ GigEscrow");
console.log(`   Dirección: ${contracts.gigEscrow}`);
console.log(`   Explorer: ${EXPLORER_BASE}/address/${contracts.gigEscrow}`);
console.log(`   Verificar manualmente: ${EXPLORER_BASE}/address/${contracts.gigEscrow}#code\n`);

console.log("2️⃣ ReputationToken");
console.log(`   Dirección: ${contracts.reputationToken}`);
console.log(`   Explorer: ${EXPLORER_BASE}/address/${contracts.reputationToken}`);
console.log(`   Verificar manualmente: ${EXPLORER_BASE}/address/${contracts.reputationToken}#code\n`);

console.log("3️⃣ StakingPool");
console.log(`   Dirección: ${contracts.stakingPool}`);
console.log(`   Explorer: ${EXPLORER_BASE}/address/${contracts.stakingPool}`);
console.log(`   Verificar manualmente: ${EXPLORER_BASE}/address/${contracts.stakingPool}#code\n`);

console.log("📝 Instrucciones para verificación manual:\n");
console.log("1. Visita cada dirección del contrato en el explorer");
console.log("2. Haz clic en la pestaña 'Contract'");
console.log("3. Haz clic en 'Verify and Publish'");
console.log("4. Selecciona 'Solidity (Single file)'");
console.log("5. Ingresa el código fuente del contrato");
console.log("6. Configuración del compilador:");
console.log("   - Compiler Version: 0.8.29");
console.log("   - Optimization: Yes");
console.log("   - Runs: 200");
console.log("7. Para ReputationToken y StakingPool, ingresa la dirección de GigEscrow como constructor argument:");
console.log(`   ${contracts.gigEscrow}\n`);

console.log("📄 Información de compilación:\n");
console.log("   Solidity Version: 0.8.29");
console.log("   Optimizer: Enabled");
console.log("   Runs: 200");
console.log("   EVM Version: Cancun\n");

console.log("✅ ==========================================");
console.log("✅ Script de verificación completado!");
console.log("✅ ==========================================");
console.log("\n💡 Nota: La verificación puede hacerse manualmente en el explorer");
console.log("   o usando la API REST del explorer si está disponible.\n");

