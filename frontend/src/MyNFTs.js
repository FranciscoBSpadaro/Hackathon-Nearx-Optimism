import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MyNFTCard from './MyNFTCard';
import contractABI from './abis/AyahuascaAbi.json';
import { Link } from 'react-router-dom';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function MyNFTs() {
  const [nfts, setNfts] = useState([]);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function getAccount() {
      if (window.ethereum) {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account);
      } else {
        alert("Por favor, instale MetaMask!");
      }
    }

    getAccount();
  }, []);

  useEffect(() => {
    async function getNFTs() {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        let nfts = [];
        const tokenIds = await contract.tokensOfOwner(account);
        for (let i = 0; i < tokenIds.length; i++) {
            const tokenURI = await contract.tokenURI(tokenIds[i]);
            nfts.push({ tokenId: tokenIds[i], tokenURI });
        }

        setNfts(nfts);
      }
    }

    getNFTs();
  }, [account]);

  if (!account) {
    return <p>Você não está conectado. Conecte sua carteira.</p>;
  }

  return (
    <div>
      <Link to="/" style={{
        display: 'inline-block',
        padding: '10px 20px',
        textDecoration: 'none',
        backgroundColor: 'rgb(201 50 119)',
        color: 'white',
        borderRadius: '5px',
      }}>Home</Link>
      {nfts.map((nft, index) => (
        <MyNFTCard key={index} tokenId={nft.tokenId} tokenURI={nft.tokenURI} />
      ))}
    </div>
  );
}

export default MyNFTs;