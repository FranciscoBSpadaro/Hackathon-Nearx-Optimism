import React, { useState, useEffect } from 'react';

function NFTCard({ type, mintNFT, images }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentImage, images]);

  const isVideo = images[currentImage].endsWith('.mp4');

  return (
    <div className="card">
      {isVideo ? (
        <video src={images[currentImage]} autoPlay loop muted playsInline />
      ) : (
        <img src={images[currentImage]} alt={type} />
      )}
      <button onClick={() => mintNFT(type)}>Mint NFT Type {type}</button>
    </div>
  );
}

export default NFTCard;