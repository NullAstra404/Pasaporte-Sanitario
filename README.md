# 🧬 Pasaporte Sanitario con Blockchain

Este proyecto implementa un sistema distribuido que permite emitir, verificar y revocar **certificados médicos digitales** en una blockchain simulada usando **Smart Contracts en Solidity**, **Ganache**, **MetaMask**, y una **interfaz web con Web3/Ethers.js**.

## 📌 Objetivos

- Proteger la **confidencialidad e integridad** de certificados sanitarios mediante hashing.
- Garantizar el **no repudio** gracias al uso de contratos inteligentes.
- Simular el acceso distribuido de ciudadanos y autoridades con cuentas de MetaMask.

## ⚙️ Tecnologías Utilizadas

- [Solidity](https://soliditylang.org/) para los contratos inteligentes.
- [Hardhat](https://hardhat.org/) para despliegue local en Ganache.
- [Ganache](https://trufflesuite.com/ganache/) como red blockchain simulada.
- [MetaMask](https://metamask.io/) como cliente de usuario.
- `ethers.js` para interacción con contratos en la web.
- `Python + Web3.py` para verificación desde scripts.
- `hashlib` para cálculo local de hash de documentos.

## 🚀 Funcionalidades

- ✅ Emisión de certificados médicos con hash SHA-256.
- 🔍 Verificación desde la web o por línea de comandos.
- ❌ Revocación de certificados inválidos.
- 🧪 Pruebas funcionales locales usando cuentas de Ganache y Metamask.

## 📂 Estructura del Proyecto
pasaporte-sanitario/
├── contracts/ # Contrato PasaporteSanitario.sol
├── scripts/ # Scripts de despliegue
├── web/ # Interfaz web con HTML + JS
├── verificar_certificado.py # Script para verificar certificados en Python
├── verificar_hash_archivo.py # Script para calcular hash de archivos
├── abi.json # ABI generado para interacción con el contrato
└── README.md # Este archivo


## 🧪 Instrucciones rápidas

### 🔧 1. Instalar dependencias

```bash
npm install

🚀 2. Iniciar Ganache y desplegar el contrato
bash
Copiar
Editar
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

🌐 3. Abrir la interfaz web
Abre el archivo web/index.html con un servidor local (ej. live-server o python3 -m http.server).

🧪 4. Verificar por consola
bash
Copiar
Editar
python verificar_certificado.py <direccion>


