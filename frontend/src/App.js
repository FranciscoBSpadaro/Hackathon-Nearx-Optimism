import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Header from './Header';
import MyNFTs from './MyNFTs';
import Transactions from './Transactions';
import NFTCard from './NFTCard';
import contractABI from './abis/AyahuascaAbi.json';

// Import images
import common1 from './assets/comun/common1.png';
import common2 from './assets/comun/common2.png';
import common3 from './assets/comun/common3.png';
import rare1 from './assets/raro/rare1.png';
import rare2 from './assets/raro/rare2.png';
import rare3 from './assets/raro/rare3.png';
import epic1 from './assets/epico/epic1.mp4';
import epic2 from './assets/epico/epic2.mp4';
import epic3 from './assets/epico/epic3.mp4';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [connectedToOptimism, setConnectedToOptimism] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(address);
      } catch (error) {
        console.error("Falha ao conectar a carteira", error);
      }
    } else {
      alert("Por favor, instale MetaMask!");
    }
  };

  async function connectToOptimism() {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xA', // Chain ID 10 for Optimism Mainnet
          chainName: 'Optimism Mainnet',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
          },
          rpcUrls: ['https://mainnet.optimism.io'],
          blockExplorerUrls: ['https://optimistic.etherscan.io']
        }]
      });
      setConnectedToOptimism(true);
    } catch (error) {
      console.error(`Failed to connect to Optimism: ${error}`);
    }
  }

  async function mintNFT(nftType) {
    try {
      await connectWallet();
      // com metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // sem metamask
      //const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
      const signer = provider.getSigner();

      const Ayahuasca = new ethers.Contract(contractAddress, contractABI, signer);

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
      console.log(`Failed to mint NFT: ${error.reason}`);
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        setConnectedToOptimism(false);
      });

      window.ethereum.on('accountsChanged', () => {
        setConnectedToOptimism(false);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', () => {
          setConnectedToOptimism(false);
        });

        window.ethereum.removeListener('accountsChanged', () => {
          setConnectedToOptimism(false);
        });
      }
    };
  }, []);

  return (
    <div className="App background-image">
    <div className="App">
      <Header connectWallet={connectWallet} connectToOptimism={connectToOptimism} connectedToOptimism={connectedToOptimism} walletAddress={walletAddress} />
      <MyNFTs />
      <Transactions />
      <h2>Ayahuasca NFT</h2>
      <p>Selecione o tipo de NFT que deseja mintar:</p>
      <p>NFT Type COMMON: 0.0075 ETH</p>
      <p>NFT Type RARE: 0.015 ETH</p>
      <p>NFT Type EPIC: 0.03 ETH</p>
      <div className="cards-container">
        <NFTCard type="COMMON" mintNFT={mintNFT} images={[common1, common2, common3]} />
        <NFTCard type="RARE" mintNFT={mintNFT} images={[rare1, rare2, rare3]} />
        <NFTCard type="EPIC" mintNFT={mintNFT} images={[epic1, epic2, epic3]} />
      </div>
      <p>Participe do sorteio de airdrop de 1 nft comum </p>
      <p>Projeto Realizado para o Hackaton Nearx</p>
      <p>Desenvolvido por: <a href="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">FBS-DEV- Equipe Optimismtic Shaman</a></p>
      </div>
    </div>
  );
}

export default App;