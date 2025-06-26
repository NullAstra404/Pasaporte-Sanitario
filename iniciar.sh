#!/bin/bash

echo "🧠 Iniciando entorno Pasaporte Sanitario Blockchain..."

GANACHE_DB="./db"
CONTRACT_ADDRESS_FILE="./scripts/contrato_direccion.txt"

# 1. Iniciar Ganache en segundo plano con base de datos persistente
echo "🚀 Iniciando Ganache con base de datos persistente..."
npx ganache \
  --wallet.seed nullastra \
  --database.dbPath "$GANACHE_DB" \
  --chain.chainId 1337 \
  --wallet.totalAccounts 10 \
  --wallet.defaultBalance 1000 \
  > ganache.log 2>&1 &

GANACHE_PID=$!
sleep 5

# 2. Compilar el contrato
echo "⚙️ Compilando contrato..."
npx hardhat compile

# 3. Verificar si el contrato ya está desplegado
if [ -f "$CONTRACT_ADDRESS_FILE" ]; then
  ADDRESS=$(cat "$CONTRACT_ADDRESS_FILE")
  echo "📦 Contrato ya desplegado en: $ADDRESS (omitido)"
else
  echo "📦 Desplegando contrato por primera vez..."
  npx hardhat run scripts/deploy.js --network ganache
fi

# 4. Iniciar servidor web
echo "🌐 Iniciando servidor web en http://127.0.0.1:8080"
cd web
npx http-server -p 8080 > ../http.log 2>&1 &

sleep 2

# 5. Abrir navegador
echo "🌍 Abriendo navegador Firefox..."
firefox http://127.0.0.1:8080 &

echo ""
echo "✅ Todo listo. PID de Ganache: $GANACHE_PID"
echo "📂 Blockchain persistente en: $(realpath ../db)"
echo "📄 Dirección del contrato almacenada en: $CONTRACT_ADDRESS_FILE"
