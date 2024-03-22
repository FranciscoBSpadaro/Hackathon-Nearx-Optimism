import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from '../abis/AyahuascaAbi.json';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MyNFTCard from './MyNFTCard';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const nftContract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

function MyNFTs() {
  const [account, setAccount] = useState(null);
  const [commonNfts, setCommonNfts] = useState([]);
  const [rareNfts, setRareNfts] = useState([]);
  const [epicNfts, setEpicNfts] = useState([]);

  useEffect(() => {
    async function getAccount() {
      try {
        if (window.ethereum) {
          const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(account);
        } else {
          alert("Por favor, instale MetaMask!");
        }
      } catch (error) {
        console.error("Erro ao conectar com a carteira: ", error);
      }
    }

    getAccount();
  }, []);

  useEffect(() => {
    async function getNFTs() {
      try {
        if (account) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, contractABI, provider);
          console.log(`Endereço do contrato : ${nftContract.address}`)

          const NftType = {
            0: 'comum',
            1: 'raro',
            2: 'epico'
          };

          const tokenIds = await contract.tokensOfOwner(account);
          let tempCommonNfts = [];
          let tempRareNfts = [];
          let tempEpicNfts = [];
          for (let i = 0; i < tokenIds.length; i++) {
            const tokenURI = await contract.tokenURI(tokenIds[i]);
            const type = NftType[await contract.getType(tokenIds[i])];
            const nft = { tokenId: tokenIds[i], tokenURI, type };

            if (type === 'comum') {
              tempCommonNfts.push(nft);
            } else if (type === 'raro') {
              tempRareNfts.push(nft);
            } else if (type === 'epico') {
              tempEpicNfts.push(nft);
            }
          }

          setCommonNfts(tempCommonNfts);
          setRareNfts(tempRareNfts);
          setEpicNfts(tempEpicNfts);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getNFTs();
  }, [account]);

  const renderCarousel = (nfts) => (
    <Carousel>
      {nfts.map((nft, index) => (
        <MyNFTCard key={index} nft={nft} />
      ))}
    </Carousel>
  );

  return (
    <div>
      {!account ? (
        <p>Você não está conectado. Conecte sua carteira.</p>
      ) : commonNfts.length === 0 && rareNfts.length === 0 && epicNfts.length === 0 ? (
        <p>👽 Você Não Tem Ayahuasca NFT 🤯.</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {commonNfts.length > 0 && (
            <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2>Comum</h2>
              <div style={{ margin: '10px' }}>
                {renderCarousel(commonNfts)}
              </div>
            </div>
          )}
          {rareNfts.length > 0 && (
            <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2>Raro</h2>
              <div style={{ margin: '10px' }}>
                {renderCarousel(rareNfts)}
              </div>
            </div>
          )}
          {epicNfts.length > 0 && (
            <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2>Épico</h2>
              <div style={{ margin: '10px' }}>
                {renderCarousel(epicNfts)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyNFTs;