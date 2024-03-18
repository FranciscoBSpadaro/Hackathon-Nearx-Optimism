import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import './App.css';

function App() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadContract() {
      // Defina o provedor para se conectar à rede Ethereum
      const provider = new Web3Provider(window.ethereum);

      // Defina o endereço do contrato Ayahuasca
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

      // Defina a ABI do contrato Ayahuasca
      const contractABI = [
        {
          "type": "constructor",
          "inputs": [
            {"name": "initialOwner", "type": "address", "internalType": "address"},
            {"name": "_nftSupply", "type": "uint256", "internalType": "uint256"},
            {"name": "_nftUrls", "type": "string[]", "internalType": "string[]"}
          ],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "COMMON_MAX_SUPPLY",
          "inputs": [],
          "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "COMMON_PRICE",
          "inputs": [],
          "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "EPIC_MAX_SUPPLY",
          "inputs": [],
          "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "RARE_MAX_SUPPLY",
          "inputs": [],
          "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "safeMint",
          "inputs": [
            {"name": "to", "type": "address", "internalType": "address"},
            {"name": "tokenId", "type": "uint256", "internalType": "uint256"}
            // ... adicione mais entradas se a função safeMint tiver mais parâmetros
          ],
          "outputs": [], // adicione saídas se a função safeMint retornar algum valor
          "stateMutability": "nonpayable" // isso pode ser "nonpayable", "view", "pure" ou "payable", dependendo da função
        },
        // ... continue adicionando todos os objetos do array ABI aqui
      ];

      // Crie uma nova instância do contrato
      const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);

      setContract(contractInstance);
    }

    loadContract();
  }, []);

  async function mintNFT() {
    if (!contract) return;

    // Defina o endereço para o qual o NFT será cunhado
    const toAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

    // Defina a URI do token e o tipo de NFT
    const tokenURI = 'QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1';
    const nftType = 0; // 0 para COMMON, 1 para RARE, 2 para EPIC

    // Cunhe o NFT
    const tx = await contract.safeMint(toAddress, tokenURI, nftType, { value: parseEther('0.0075') });

    // Aguarde a transação ser confirmada
    await tx.wait();

    console.log('NFT minted!');
  }

  return (
    <div className="App">
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
}

export default App;