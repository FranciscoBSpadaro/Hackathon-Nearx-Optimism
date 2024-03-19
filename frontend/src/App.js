import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
// import { formatBytes32String } from '@ethersproject/strings';
//import { JsonRpcProvider } from '@ethersproject/providers';
// import { Web3Provider } from '@ethersproject/providers';
import './App.css';

function App() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadContract() {
      // Verifique se o MetaMask está instalado
      if (!window.ethereum) {
        console.error("Por favor, instale o MetaMask!");
        return;
      }

      // Crie um novo provider usando o MetaMask
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Crie um novo provider usando um URL RPC personalizado
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

      // Solicite ao usuário para conectar à sua carteira
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Crie um novo signer
      const signer = provider.getSigner();

      // Defina o endereço do contrato Ayahuasca
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

      // Defina a ABI do contrato Ayahuasca
      const contractABI = [
        {
          "type": "constructor",
          "inputs": [
            { "name": "initialOwner", "type": "address", "internalType": "address" },
            { "name": "_nftSupply", "type": "uint256", "internalType": "uint256" },
            { "name": "_nftUrls", "type": "string[]", "internalType": "string[]" }
          ],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "COMMON_MAX_SUPPLY",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "COMMON_PRICE",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "EPIC_MAX_SUPPLY",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "RARE_MAX_SUPPLY",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_to",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "_tokenURI",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nftType",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "name": "safeMint",
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "payable": true, // Alterado de false para true
          "stateMutability": "payable", // Alterado de nonpayable para payable
          "type": "function"
        }
        // ... outros elementos da ABI ...
      ];
      // Crie uma nova instância do contrato
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

      setContract(contractInstance);
    }

    loadContract();
  }, []);

  async function mintNFT() {
    if (!contract) return;

    // Defina o endereço para o qual o NFT será cunhado
    const toAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

    // Defina a URI do o tipo de NFT
    const tokenURI = 'QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1';
    const nftType = 0; // 0 para COMMON, 1 para RARE, 2 para EPIC

    // Cunhe o NFT
    const tx = await contract.safeMint(toAddress, tokenURI, nftType, { value: ethers.utils.parseUnits('0.0075', 'ether').toString() });

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