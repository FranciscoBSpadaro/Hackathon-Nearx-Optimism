import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import './App.css';
import contractABI from './abis/AyahuascaAbi.json';

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      return account;
    } catch (error) {
      console.error("Usuário recusou a conexão com a carteira");
    }
  } else {
    console.log("Metamask não está instalado. Por favor, instale o Metamask e tente novamente");
  }
}

function App() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadContract() {
      // Verifique se o MetaMask está instalado
      if (!window.ethereum) {
        console.error("Por favor, instale o MetaMask!");
        return;
      }

      // Solicite ao usuário para conectar à sua carteira
      const account = await connectWallet();
      if (!account) return;

      // Crie um novo provider usando um URL RPC personalizado
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

      // Crie um novo signer
      const signer = provider.getSigner();

      // Defina o endereço do contrato Ayahuasca
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

      // Defina a ABI do contrato Ayahuasca


      // Crie uma nova instância do contrato
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

      setContract(contractInstance);
    }

    loadContract();
  }, []);

  async function mintNFT() {
    const account = await connectWallet();
    if (!account) return;

    if (!contract) return;

    // Defina o endereço para o qual o NFT será cunhado
    const toAddress = account; // Use o endereço da conta conectada

    // Defina a URI do o tipo de NFT
    const tokenURI = 'mY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1';
    const nftType = 0; // 0 para COMMON, 1 para RARE, 2 para EPIC

    // Defina o preço com base no tipo de NFT
    let price;
    if (nftType === 0) {
      price = ethers.utils.parseUnits('0.0075', 'ether').toString();
    } else if (nftType === 1) {
      price = ethers.utils.parseUnits('0.015', 'ether').toString();
    } else if (nftType === 2) {
      price = ethers.utils.parseUnits('0.03', 'ether').toString();
    }

    // Cunhe o NFT com um limite de gás manual
    const gasLimit = ethers.utils.hexlify(2000000); // 2,000,000 de gás
    const tx = await contract.safeMint(toAddress, tokenURI, nftType, { value: price, gasLimit: gasLimit });

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