const fs = require('fs');
const path = require('path');

// Caminho para o arquivo JSON do contrato
const contractPath = path.resolve(__dirname, './out/Ayahuasca.sol/Ayahuasca.json');

// Ler o arquivo JSON do contrato
const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

// Extrair o ABI do contrato
const contractAbi = contractJson.abi;

// Converter o ABI em uma string JSON
const abiJson = JSON.stringify(contractAbi, null, 2);

// Caminho para o novo arquivo JSON
const abiPath = path.resolve(__dirname, './AyahuascaAbi.json');

// Escrever a string JSON no novo arquivo
fs.writeFileSync(abiPath, abiJson);

console.log('ABI escrito para ' + abiPath);