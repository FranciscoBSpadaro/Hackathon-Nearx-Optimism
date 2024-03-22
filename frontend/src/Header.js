import React from 'react';
import { useLocation } from 'react-router-dom';

function Header({ connectWallet, connectToOptimism, connectedToOptimism, walletAddress }) {
  const location = useLocation();

  return (
    <div className="header">
      <div className="center-links">
        {location.pathname !== '/' && <a href="/" className="button-link">Home</a>}
        <a href="/mynfts" className="button-link">Meus NFTs</a>
      </div>
      <div className="wallet-buttons">
        <button className="button-link" onClick={connectWallet}>
          {walletAddress ? `(Carteira: ${walletAddress.slice(0, 8)}...)` : 'Conectar Carteira'}
        </button>
        <button className="button-link" onClick={connectToOptimism} disabled={connectedToOptimism}>
          {connectedToOptimism ? 'Conectado à Rede Optimism' : 'Conectar à Rede Optimism'}
        </button>
      </div>
    </div>
  );
}

export default Header;