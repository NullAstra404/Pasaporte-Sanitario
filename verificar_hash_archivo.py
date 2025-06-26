import sys
import json
import hashlib
from web3 import Web3

# Validar entrada
if len(sys.argv) != 3:
    print("Uso: python verificar_hash_archivo.py <archivo.pdf> <direccion_ethereum>")
    sys.exit(1)

archivo = sys.argv[1]
direccion_ciudadano = sys.argv[2]

# Calcular el hash SHA-256 del archivo
try:
    with open(archivo, "rb") as f:
        contenido = f.read()
        hash_local = hashlib.sha256(contenido).hexdigest()
        print(f"📄 Hash SHA-256 del archivo: {hash_local}")
except FileNotFoundError:
    print(f"❌ Archivo no encontrado: {archivo}")
    sys.exit(1)

# Conectar a Ganache
ganache_url = "http://127.0.0.1:8545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

if not web3.is_connected():
    print("❌ No se pudo conectar a Ganache en", ganache_url)
    sys.exit(1)

# Leer ABI
with open("abi.json", "r") as abi_file:
    abi = json.load(abi_file)

# Dirección del contrato
direccion_contrato = "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0"

# Instanciar contrato
contrato = web3.eth.contract(
    address=web3.to_checksum_address(direccion_contrato),
    abi=abi
)

# Verificar en blockchain
try:
    resultado = contrato.functions.verificarUltimo(
        web3.to_checksum_address(direccion_ciudadano)
    ).call()

    print("\n📬 Resultado en blockchain:")
    print("👤 Nombre:", resultado[0])
    print("🦠 Enfermedad:", resultado[1])
    print("🔐 Hash registrado:", resultado[2])
    print("✔️ ¿Válido?:", "✅ Sí" if resultado[3] else "❌ No")

    if resultado[2] == hash_local:
        print("\n🟢 El hash del archivo coincide con el certificado registrado.")
    else:
        print("\n🔴 El hash del archivo NO coincide con el certificado.")
except Exception as e:
    print("❌ Error al verificar:", e)
