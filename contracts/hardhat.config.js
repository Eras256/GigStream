import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-chai-matchers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno desde .env.local
config({ path: join(__dirname, "..", ".env.local") });

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: {
    version: "0.8.29",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: false,
    },
  },
  networks: {
    somniaTestnet: {
      type: "http",
      url: process.env.SOMNIA_RPC_URL || process.env.NEXT_PUBLIC_SOMNIA_RPC_URL || "https://dream-rpc.somnia.network",
      chainId: parseInt(process.env.NEXT_PUBLIC_SOMNIA_CHAIN_ID || "50312"),
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      somniaTestnet: process.env.SOMNIA_EXPLORER_API_KEY || "R3HXHXJUA2J66MMX5NY2QP21KXV3MJR7HM",
    },
    customChains: [
      {
        network: "somniaTestnet",
        chainId: 50312,
        urls: {
          apiURL: "https://verify-contract.xangle.io/somnia/api",
          browserURL: "https://shannon-explorer.somnia.network",
        },
      },
    ],
  },
  paths: {
    sources: "./src",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  // Ignorar archivos de test de Foundry durante la compilación
  soliditySources: {
    exclude: ["test/**"],
  },
  mocha: {
    timeout: 120000,
  },
};

