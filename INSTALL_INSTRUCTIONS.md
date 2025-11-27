# 🔧 Instrucciones de Instalación - Resolver Error de Permisos

## Problema
Los módulos `@wagmi/core`, `@reown/appkit-adapter-wagmi`, y `viem` no se pueden instalar debido a errores de permisos (EPERM).

## Solución Paso a Paso

### 1. Cerrar el Servidor de Desarrollo
- Si tienes `pnpm run dev` corriendo, presiona `Ctrl+C` para detenerlo
- Cierra todas las ventanas de terminal que tengan procesos de Node.js

### 2. Cerrar Todas las Instancias de Node.js
Abre PowerShell como Administrador y ejecuta:
```powershell
taskkill /F /IM node.exe
```

### 3. Cerrar el Editor (Cursor/VS Code)
- Cierra completamente Cursor o VS Code
- Esto liberará cualquier archivo bloqueado

### 4. Instalar Dependencias
Abre una nueva terminal y ejecuta:
```bash
pnpm install
```

### 5. Si el Error Persiste
Intenta instalar las dependencias faltantes una por una:
```bash
pnpm add @wagmi/core @reown/appkit-adapter-wagmi viem wagmi
```

### 6. Verificar Instalación
Verifica que los módulos estén instalados:
```bash
Test-Path "node_modules\@wagmi\core"
Test-Path "node_modules\@reown\appkit-adapter-wagmi"
Test-Path "node_modules\viem"
```

Todos deberían devolver `True`.

### 7. Reiniciar el Servidor
```bash
pnpm run dev
```

## Alternativa: Reinstalar Todo
Si nada funciona, elimina `node_modules` y `pnpm-lock.yaml` y reinstala:
```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue
pnpm install
```

