# 🚀 GigStream MX - Guía de Deploy

## 📋 Checklist de Deploy

### 1. Configuración de Variables de Entorno

Copia `env.example` a `.env.local` y completa:

```bash
cp env.example .env.local
```

Variables requeridas:
- `NEXT_PUBLIC_SOMNIA_RPC_URL` - RPC de Somnia Testnet
- `NEXT_PUBLIC_REOWN_PROJECT_ID` - Project ID de Reown (WalletConnect)
- `GOOGLE_GENERATIVE_AI_API_KEY` - API Key de Google Gemini

### 2. Deploy de Contratos (Hardhat)

```bash
# Compilar contratos
pnpm run contracts:compile

# Ejecutar tests
pnpm run contracts:test

# Deploy a Testnet
pnpm run contracts:deploy-testnet

# Verificar contratos en explorer
pnpm run contracts:verify
```

Después del deploy, actualiza `NEXT_PUBLIC_GIGESCROW_ADDRESS` en `.env.local`

### 3. Deploy Frontend (Vercel)

```bash
# Build local
pnpm run build

# Deploy a Vercel
pnpm run deploy:vercel
```

O conecta tu repo GitHub a Vercel para CI/CD automático.

### 4. Tests E2E

```bash
# Ejecutar tests
pnpm run test:e2e

# Ver reporte
pnpm exec playwright show-report
```

### 5. Security Audit

```bash
# Slither
pnpm run security:slither

# Gas optimization (via Hardhat)
cd contracts && npx hardhat test --gas-reporter
```

## ✅ Verificación Post-Deploy

- [ ] Contratos desplegados en Somnia Testnet
- [ ] Frontend live en Vercel
- [ ] Variables de entorno configuradas
- [ ] Tests E2E pasando
- [ ] Security audit completo
- [ ] README actualizado con links

## 🔗 Links de Producción

- Frontend: https://gigstream-mx.vercel.app
- Explorer: https://somnia-testnet.explorer.somnia.network
- Contracts: [Ver en Explorer después del deploy]

