import React from 'react';

function MyNFTCard({ nft }) {
  const isVideo = nft.tokenURI && nft.tokenURI.endsWith('.mp4');

  return (
    <div className="card">
      {isVideo ? (
        <video src={nft.tokenURI} autoPlay loop muted playsInline />
      ) : (
        <img src={nft.tokenURI} alt={`NFT ${nft.tokenId}`} />
      )}
      <p>{`NFT ID ${nft.tokenId}`}</p>
    </div>
  );
}

export default MyNFTCard;