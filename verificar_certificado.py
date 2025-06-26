import sys
import json
from web3 import Web3

# Validar argumento
if len(sys.argv) != 2:
    print("Uso: python3 verificar_certificado.py <direccion_ethereum>")
    sys.exit(1)

direccion_ciudadano = sys.argv[1]

# Conectarse a Ganache
ganache_url = "http://127.0.0.1:8545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

if not web3.is_connected():
    print("❌ No se pudo conectar a Ganache en", ganache_url)
    sys.exit(1)

# Leer ABI
with open("abi.json", "r") as abi_file:
    abi = json.load(abi_file)

# Dirección del contrato (ajusta si cambia en tu despliegue)
direccion_contrato = "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0"

# Conectar al contrato
contrato = web3.eth.contract(
    address=web3.to_checksum_address(direccion_contrato),
    abi=abi
)

# Ejecutar verificación
try:
    resultado = contrato.functions.verificarUltimo(
        web3.to_checksum_address(direccion_ciudadano)
    ).call()

    print("✅ Certificado encontrado:")
    print("👤 Nombre:", resultado[0])
    print("🦠 Enfermedad:", resultado[1])
    print("🔐 Hash del documento:", resultado[2])
    print("✔️ ¿Válido?:", "✅ Sí" if resultado[3] else "❌ No")
except Exception as e:
    print("❌ Error al verificar:", e)
