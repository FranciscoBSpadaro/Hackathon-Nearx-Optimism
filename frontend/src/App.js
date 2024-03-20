import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import contractABI from './abis/AyahuascaAbi.json';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [connectedToOptimism, setConnectedToOptimism] = useState(false);

  async function connectWallet() {
    try {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(account);
    } catch (error) {
      console.error(`Failed to connect wallet: ${error}`);
    }
  }

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
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
      // sem metamask
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
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
    <div className="App">
      <button onClick={connectWallet}>
        Conectar Carteira {walletAddress ? `(${walletAddress.slice(0, 5)}...)` : ''}
      </button>
      <button onClick={connectToOptimism} disabled={connectedToOptimism}>
        {connectedToOptimism ? 'Conectado à Rede Optimism' : 'Conectar à Rede Optimism'}
      </button>
      <button onClick={() => mintNFT('COMMON')}>Mint NFT Type COMMON</button>
      <button onClick={() => mintNFT('RARE')}>Mint NFT Type RARE</button>
      <button onClick={() => mintNFT('EPIC')}>Mint NFT Type EPIC</button>
    </div>
  );
}

export default App;