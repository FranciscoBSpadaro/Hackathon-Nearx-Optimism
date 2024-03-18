import { useState, useEffect } from 'react';
import { useWeb3React, Web3ContextType } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';
import { AbstractConnector } from '@web3-react/abstract-connector';
import './App.css';

// Define o conector injetado para conectar-se a extensões de navegador como MetaMask e TrustWallet
const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    10, // Optimism
    69, // Optimism Kovan
  ],
});

interface CustomWeb3ContextType extends Web3ContextType<Web3Provider> {
  activate: (connector: AbstractConnector) => void;
  deactivate: () => void;
  active: boolean;
  library: Web3Provider;
}

interface NFT {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic';
}

const NFTs: NFT[] = [
  { id: '1', name: 'NFT Comum', rarity: 'common' },
  { id: '2', name: 'NFT Raro', rarity: 'rare' },
  { id: '3', name: 'NFT Épico', rarity: 'epic' },
];

function NFTCard({ nft }: { nft: NFT }) {
  return (
    <div>
      <h2>{nft.name}</h2>
      <p>Raridade: {nft.rarity}</p>
    </div>
  );
}

function App() {
  const [balance, setBalance] = useState<number>(0);
  const {
    chainId,
    account,
    activate,
    deactivate,
    active,
    library
  } = useWeb3React<Web3Provider>() as CustomWeb3ContextType;

  useEffect(() => {
    if (active && account && library) {
      library
        .getBalance(account)
        .then((balance: BigNumber) => {
          setBalance(parseFloat(formatEther(balance)));
        })
        .catch((err: Error) => console.error(err));
    }
  }, [account, library, chainId, active]);

  console.log(account);

  return (
    <div className="App">
      <header className="App-header">
        {active ? (
          <div>
            <p>Connected with {account}</p>
            <p>Balance: {balance.toFixed(3)} ETH</p>
            <button onClick={deactivate}>Disconnect</button>
          </div>
        ) : (
          <button onClick={() => activate(injectedConnector)}>Connect Wallet</button>
        )}
      </header>
      <main>
        {NFTs.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </main>
    </div>
  );
}

export default App;