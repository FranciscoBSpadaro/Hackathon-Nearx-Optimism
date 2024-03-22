import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import './App.css';
import Header from './Header';
import MyNFTs from './Meus NFTs/MyNFTs';
import NFTCard from './NFTCard';
import contractABI from './abis/AyahuascaAbi.json';

// Import images
import common from './assets/comun';
import rare from './assets/raro';
import epic from './assets/epico';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [connectedToOptimism, setConnectedToOptimism] = useState(false);
  const [commonNFTs, setCommonNFTs] = useState(0);
  const [rareNFTs, setRareNFTs] = useState(0);
  const [epicNFTs, setEpicNFTs] = useState(0);

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
      // com metamask produção
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // sem metamask (teste)
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

  useEffect(() => {
    const fetchNFTCounts = async () => {
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
      // descomentar o codigo a cima e comentar abaixo quando em produção
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL)
      const contratoAddress = contractAddress;
      const ABI = contractABI;

      const contract = new ethers.Contract(contratoAddress, ABI, provider);

      // Definindo os tipos de NFTs conforme o contrato
      const NftType = {
        COMMON: 0,
        RARE: 1,
        EPIC: 2
      };

      const commonNFTCount = await contract.getNftCount(NftType.COMMON);
      const rareNFTCount = await contract.getNftCount(NftType.RARE);
      const epicNFTCount = await contract.getNftCount(NftType.EPIC);

      setCommonNFTs(commonNFTCount.toNumber());
      setRareNFTs(rareNFTCount.toNumber());
      setEpicNFTs(epicNFTCount.toNumber());
    };

    fetchNFTCounts();
  }, []);

  return (
    <Router>
      <div className="App background-image">
        <div className="App">
          <Header connectWallet={connectWallet} connectToOptimism={connectToOptimism} connectedToOptimism={connectedToOptimism} walletAddress={walletAddress} />
          <Routes>
            <Route path="/MyNFTs" element={<MyNFTs account={walletAddress} />} />

            <Route path="/" element={
              <>
                <h1>Ayahuasca NFT</h1>
                <p>Selecione o tipo de NFT que deseja mintar:</p>
                <p>NFT Type COMMON: 0.0075 ETH</p>
                <p>NFT Type RARE: 0.015 ETH</p>
                <p>NFT Type EPIC: 0.03 ETH</p>
                <div className="cards-container">
                  <NFTCard type="COMMON" mintNFT={mintNFT} images={common} nftCount={commonNFTs} />
                  <NFTCard type="RARE" mintNFT={mintNFT} images={rare} nftCount={rareNFTs} />
                  <NFTCard type="EPIC" mintNFT={mintNFT} images={epic} nftCount={epicNFTs} />
                </div>
                <br></br>
                <p>Total Supply 170 NFTs</p>
                <p>100 NFTs Common  - With 50 Random NFT Images</p>
                <p>50 NFTs Rare - With 25 Random NFT Images </p>
                <p>20 NFTs Epic - With 10  Random NFT Animated Images </p>
                <p>85 NFT Images </p>
                <br></br>
                <p>Airdrop de até 10 Nfts Comum para 10 participantes de sorteio </p>
                <p>Participe do Sorteio de NFTs Comum : <a href="https://...">Formulario de Sorteio 📝</a></p>
                <p>Projeto Realizado para o <a href="https://nearx.notion.site/Hackathon-Optimism-NearX-21124cc4067042cc95bc1c2434322faf">Hackaton Nearx ✨</a></p>
                <p>Desenvolvido por: <a href="https://github.com/FranciscoBSpadaro">FBS-DEV 👨‍💻</a></p>

              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;