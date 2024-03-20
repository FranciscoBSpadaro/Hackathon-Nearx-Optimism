import React from 'react';

function Header({ connectWallet, connectToOptimism, connectedToOptimism, walletAddress }) {
  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? `(Carteira: ${walletAddress.slice(0, 8)}...)` : 'Conectar Carteira'}
      </button>
      <button onClick={connectToOptimism} disabled={connectedToOptimism}>
        {connectedToOptimism ? 'Conectado à Rede Optimism' : 'Conectar à Rede Optimism'}
      </button>
      <a href="/mynfts" className="button-link">Meus NFTs</a>
      <a href="/transactions" className="button-link">Histórico de Transações</a>
    </div>
  );
}

export default Header;