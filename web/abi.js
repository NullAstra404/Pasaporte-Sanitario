const contratoABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "certificados",
    "outputs": [
      {
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "enfermedad",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hashDocumento",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "valido",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ciudadano",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "enfermedad",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hashDocumento",
        "type": "string"
      }
    ],
    "name": "emitirCertificado",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ciudadano",
        "type": "address"
      }
    ],
    "name": "revocarUltimo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ciudadano",
        "type": "address"
      }
    ],
    "name": "verificarUltimo",
    "outputs": [
      {
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "enfermedad",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hashDocumento",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "valido",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const contratoDireccion = "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0";
