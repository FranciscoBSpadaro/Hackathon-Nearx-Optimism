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
      //const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
      const signer = provider.getSigner();
  
      const Ayahuasca = new ethers.Contract(contractAddress, contractABI, signer);

    // Defina o preço com base no tipo de NFT
    let price;
    let uri;

    const NftType = {
      COMMON: 0,
      RARE: 1,
      EPIC: 2
    };

    if (nftType === NftType.COMMON) {
      price = ethers.utils.parseUnits('0.0075', 'ether');
      uri = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1";
    } else if (nftType === NftType.RARE) {
      price = ethers.utils.parseUnits('0.015', 'ether');
      uri = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa93pxnxjQuP2";
    } else if (nftType === NftType.EPIC) {
      price = ethers.utils.parseUnits('0.03', 'ether');
      uri = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP3";
    }

    console.log(`Minting NFT account=${account}, uri=${uri}, nftType=${nftType}, price=${price}`);

    const tx = await Ayahuasca.safeMint(account, uri, nftType, {
      value: price
    });
    console.log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log(`Transaction completed: ${tx.hash}`);
  } catch (error) {
    console.error(`Error: ${JSON.stringify(error)}`);
  }
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