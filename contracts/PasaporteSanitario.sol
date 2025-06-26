// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract PasaporteSanitario {
    address public owner;

    struct Certificado {
        string nombre;
        string enfermedad;
        string hashDocumento;
        bool valido;
    }

    mapping(address => Certificado[]) public certificados;

    constructor() {
        owner = msg.sender;
    }

    function emitirCertificado(
        address ciudadano,
        string memory nombre,
        string memory enfermedad,
        string memory hashDocumento
    ) public {
        require(msg.sender == owner, "Solo el emisor puede emitir certificados");

        Certificado memory nuevo = Certificado({
            nombre: nombre,
            enfermedad: enfermedad,
            hashDocumento: hashDocumento,
            valido: true
        });

        certificados[ciudadano].push(nuevo);
    }

    function verificarUltimo(address ciudadano)
        public
        view
        returns (string memory nombre, string memory enfermedad, string memory hashDocumento, bool valido)
    {
        uint len = certificados[ciudadano].length;
        require(len > 0, "No hay certificados");
        Certificado memory c = certificados[ciudadano][len - 1];
        return (c.nombre, c.enfermedad, c.hashDocumento, c.valido);
    }

    function revocarUltimo(address ciudadano) public {
        require(msg.sender == owner, "Solo el emisor puede revocar");
        uint len = certificados[ciudadano].length;
        require(len > 0, "No hay certificados");
        certificados[ciudadano][len - 1].valido = false;
    }
}
