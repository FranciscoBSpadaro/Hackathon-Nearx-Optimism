import { ethers } from 'ethers';
import React, { useEffect } from 'react';
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
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

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

      // Crie uma nova instância do contrato
      new ethers.Contract(contractAddress, contractABI, signer);
    }

    loadContract();
  }, [contractAddress]);

  async function mintNFT(nftType) {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    // Defina o preço com base no tipo de NFT
    let price;
    if (nftType === 0) {
      price = ethers.utils.parseUnits('0.0075', 'ether');
    } else if (nftType === 1) {
      price = ethers.utils.parseUnits('0.015', 'ether');
    } else if (nftType === 2) {
      price = ethers.utils.parseUnits('0.03', 'ether');
    }

    // nft mint
    const tx = await contract.safeMint(account, 'mY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1', '0', {
      value: price
    });
  
    console.log(`Transação enviada: ${tx.hash}`);
    await tx.wait();
    console.log(`Transação concluída: ${tx.hash}`);
  }

  return (
    <div className="App">
      <button onClick={() => mintNFT(0)}>Mint NFT Type 0</button>
      <button onClick={() => mintNFT(1)}>Mint NFT Type 1</button>
      <button onClick={() => mintNFT(2)}>Mint NFT Type 2</button>
    </div>
  );
}

export default App;