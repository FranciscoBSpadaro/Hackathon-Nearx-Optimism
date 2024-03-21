import React from 'react';

function MyNFTCard({ tokenId, tokenURI }) {
  return (
    <div>
      <h2>{`Token ID: ${tokenId}`}</h2>
      <p>{`Token URI: ${tokenURI}`}</p>
    </div>
  );
}

export default MyNFTCard;