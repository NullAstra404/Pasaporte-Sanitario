let provider;
let signer;
let contrato;

async function conectarMetamask() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    contrato = new ethers.Contract(contratoDireccion, contratoABI, signer);
    alert("✅ MetaMask conectado correctamente");
  } else {
    alert("⚠️ Instala MetaMask para continuar");
  }
}

async function emitir() {
  const direccion = document.getElementById("direccionNuevo").value;
  const nombre = document.getElementById("nombre").value;
  const enfermedad = document.getElementById("enfermedad").value;
  const hash = document.getElementById("hash").value;

  if (!ethers.utils.isAddress(direccion)) {
    alert("⚠️ Dirección no válida");
    return;
  }

  try {
    const tx = await contrato.emitirCertificado(direccion, nombre, enfermedad, hash);
    await tx.wait();
    alert("✅ Certificado emitido correctamente");
  } catch (error) {
    console.error("❌ Error al emitir:", error);
    alert("❌ Hubo un error al emitir el certificado.");
  }
}

async function verificar() {
  const direccion = document.getElementById("direccion").value;
  const resultadoDiv = document.getElementById("resultado");

  try {
    const resultado = await contrato.verificarUltimo(direccion);
    resultadoDiv.innerHTML = `
    <div style="border: 2px solid #007BFF; padding: 15px; border-radius: 10px; background-color: #f8f9fa; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin-top: 20px;">
    <p>👤 <strong>Nombre:</strong> ${resultado.nombre}</p>
    <p>🦠 <strong>Enfermedad:</strong> ${resultado.enfermedad}</p>
    <p>🔐 <strong>Hash del documento:</strong> ${resultado.hashDocumento}</p>
    <p><strong>¿Es válido?:</strong> ${resultado.valido ? "✅ Sí" : "❌ No"}</p>
    </div>
    `;
  } catch (error) {
    resultadoDiv.innerHTML = `<div style="color: #dc3545; font-weight: bold; margin-top: 20px;">❌ Error al verificar el certificado.</div>`;
    console.error("Error en verificación:", error);
  }
}

async function revocar() {
  const direccion = document.getElementById("direccionRevocar").value;

  if (!ethers.utils.isAddress(direccion)) {
    alert("⚠️ Dirección no válida");
    return;
  }

  try {
    const tx = await contrato.revocarUltimo(direccion);
    await tx.wait();
    alert("✅ Certificado revocado correctamente");
  } catch (error) {
    console.error("❌ Error al revocar:", error);
    alert("❌ No se pudo revocar el certificado.");
  }
}
