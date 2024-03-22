import React from 'react';

function MyNFTCard({ nft }) {
  return (
    <div className="card">
      <img src={nft.tokenURI} alt={`NFT ${nft.tokenId}`} />
      <p>{`NFT ID ${nft.tokenId}`}</p>
    </div>
  );
}

export default MyNFTCard;