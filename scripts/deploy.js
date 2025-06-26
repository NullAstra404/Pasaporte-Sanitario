const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("⛓️  Desplegando contrato...");

  const PasaporteSanitario = await hre.ethers.getContractFactory("PasaporteSanitario");
  const contrato = await PasaporteSanitario.deploy();
  await contrato.waitForDeployment();

  const direccion = await contrato.getAddress();
  console.log(`✅ Contrato desplegado en: ${direccion}`);

  // Guardar dirección en archivo
  const direccionPath = path.join(__dirname, "contrato_direccion.txt");
  fs.writeFileSync(direccionPath, direccion);
  console.log(`📄 Dirección guardada en: ${direccionPath}`);

  // Obtener ABI y guardarlo como archivo JS
  const artifact = await hre.artifacts.readArtifact("PasaporteSanitario");
  const abiPath = path.join(__dirname, "../web/abi.js");
  const abiContent = `const contratoABI = ${JSON.stringify(artifact.abi, null, 2)};\nconst contratoDireccion = "${direccion}";\n`;
  fs.writeFileSync(abiPath, abiContent);
  console.log(`🧠 ABI y dirección guardados en: ${abiPath}`);
}

main().catch((error) => {
  console.error("❌ Error al desplegar:", error);
  process.exitCode = 1;
});
