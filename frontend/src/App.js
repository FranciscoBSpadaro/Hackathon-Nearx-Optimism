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
    try {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log(`Account: ${account}`);
      // usando metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // sem metamask
      //const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
      const signer = provider.getSigner();

      const Ayahuasca = new ethers.Contract(contractAddress, contractABI, signer);

      // Defina o preço com base no tipo de NFT
      let price;
      if (nftType === 'COMMON') {
        price = ethers.utils.parseEther('0.0075');
        nftType = 0;
      } else if (nftType === 'RARE') {
        price = ethers.utils.parseEther('0.015');
        nftType = 1;
      } else if (nftType === 'EPIC') {
        price = ethers.utils.parseEther('0.03');
        nftType = 2;
      }

      const transaction = await Ayahuasca.mintNft(nftType, { value: price });
      //console.log(`Minting NFT account=${account}, uri=${uri}, nftType=${nftType}, price=${price}`);
      await transaction.wait();

      console.log(`Minted NFT of type: ${nftType}`);
      console.log(`Transaction completed: ${transaction.hash}`);
    } catch (error) {
      console.error(`Failed to mint NFT: ${error}`);
      console.error(`Error: ${JSON.stringify(error)}`);
    }
  }

  return (
    <div className="App">
      <button onClick={() => mintNFT('COMMON')}>Mint NFT Type COMMON</button>
      <button onClick={() => mintNFT('RARE')}>Mint NFT Type RARE</button>
      <button onClick={() => mintNFT('EPIC')}>Mint NFT Type EPIC</button>
    </div>
  );
}

export default App;