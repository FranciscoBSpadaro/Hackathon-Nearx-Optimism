// Card component to display NFTs and mint in HOME
import React, { useState, useEffect } from 'react';

function NFTCard({ type, mintNFT, images, nftCount }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImage, images]);

  const isVideo = images[currentImage] && images[currentImage].endsWith('.mp4');

  return (
    <div className="card">
      {isVideo ? (
        <video src={images[currentImage]} autoPlay loop muted playsInline />
      ) : (
        <img src={images[currentImage]} alt={type} />
      )}
      <button onClick={() => mintNFT(type)}>Random Mint NFT {type}</button>
      <p>{nftCount} NFT {type} Already Minted</p>
    </div>
  );
}

export default NFTCard;