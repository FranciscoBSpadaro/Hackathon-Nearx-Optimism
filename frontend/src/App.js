import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import './App.css';

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      return account;
    } catch (error) {
      console.error("Usuário recusou a conexão com a carteira");
    }
  } else {
    console.log("Metamask não está instalado. Por favor, instale o Metamask e tente novamente");
  }
}

function App() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadContract() {
      // Verifique se o MetaMask está instalado
      if (!window.ethereum) {
        console.error("Por favor, instale o MetaMask!");
        return;
      }

      // Solicite ao usuário para conectar à sua carteira
      const account = await connectWallet();
      if (!account) return;

      // Crie um novo provider usando um URL RPC personalizado
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

      // Crie um novo signer
      const signer = provider.getSigner();

      // Defina o endereço do contrato Ayahuasca
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

      // Defina a ABI do contrato Ayahuasca
      const contractABI = [
          {
            "type": "constructor",
            "inputs": [
              {
                "name": "initialOwner",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "_nftSupply",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "_nftUrls",
                "type": "string[]",
                "internalType": "string[]"
              }
            ],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "COMMON_MAX_SUPPLY",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "COMMON_PRICE",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "EPIC_MAX_SUPPLY",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "EPIC_PRICE",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "RARE_MAX_SUPPLY",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "RARE_PRICE",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "approve",
            "inputs": [
              {
                "name": "to",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "balanceOf",
            "inputs": [
              {
                "name": "owner",
                "type": "address",
                "internalType": "address"
              }
            ],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "getApproved",
            "inputs": [
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [
              {
                "name": "",
                "type": "address",
                "internalType": "address"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "getBaseURI",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "string",
                "internalType": "string"
              }
            ],
            "stateMutability": "pure"
          },
          {
            "type": "function",
            "name": "getCommonPrice",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "pure"
          },
          {
            "type": "function",
            "name": "getEpicPrice",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "pure"
          },
          {
            "type": "function",
            "name": "getRarePrice",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "pure"
          },
          {
            "type": "function",
            "name": "isApprovedForAll",
            "inputs": [
              {
                "name": "owner",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "operator",
                "type": "address",
                "internalType": "address"
              }
            ],
            "outputs": [
              {
                "name": "",
                "type": "bool",
                "internalType": "bool"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "name",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "string",
                "internalType": "string"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "nftSupply",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "nftUrls",
            "inputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [
              {
                "name": "",
                "type": "string",
                "internalType": "string"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "owner",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "address",
                "internalType": "address"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "ownerOf",
            "inputs": [
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [
              {
                "name": "",
                "type": "address",
                "internalType": "address"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "renounceOwnership",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "safeMint",
            "inputs": [
              {
                "name": "to",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "uri",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "nftType",
                "type": "uint8",
                "internalType": "enum Ayahuasca.NftType"
              }
            ],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "payable"
          },
          {
            "type": "function",
            "name": "safeTransferFrom",
            "inputs": [
              {
                "name": "from",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "to",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "safeTransferFrom",
            "inputs": [
              {
                "name": "from",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "to",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "setApprovalForAll",
            "inputs": [
              {
                "name": "operator",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "approved",
                "type": "bool",
                "internalType": "bool"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "supportsInterface",
            "inputs": [
              {
                "name": "interfaceId",
                "type": "bytes4",
                "internalType": "bytes4"
              }
            ],
            "outputs": [
              {
                "name": "",
                "type": "bool",
                "internalType": "bool"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "symbol",
            "inputs": [],
            "outputs": [
              {
                "name": "",
                "type": "string",
                "internalType": "string"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "tokenURI",
            "inputs": [
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [
              {
                "name": "",
                "type": "string",
                "internalType": "string"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "transferFrom",
            "inputs": [
              {
                "name": "from",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "to",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "transferOwnership",
            "inputs": [
              {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "event",
            "name": "Approval",
            "inputs": [
              {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
              },
              {
                "name": "approved",
                "type": "address",
                "indexed": true,
                "internalType": "address"
              },
              {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
              }
            ],
            "anonymous": false
          },
          {
            "type": "event",
            "name": "ApprovalForAll",
            "inputs": [
              {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
              },
              {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
              },
              {
                "name": "approved",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
              }
            ],
            "anonymous": false
          },
          {
            "type": "event",
            "name": "BatchMetadataUpdate",
            "inputs": [
              {
                "name": "_fromTokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
              },
              {
                "name": "_toTokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
              }
            ],
            "anonymous": false
          },
          {
            "type": "event",
            "name": "MetadataUpdate",
            "inputs": [
              {
                "name": "_tokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
              }
            ],
            "anonymous": false
          },
          {
            "type": "event",
            "name": "OwnershipTransferred",
            "inputs": [
              {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
              },
              {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
              }
            ],
            "anonymous": false
          },
          {
            "type": "event",
            "name": "Transfer",
            "inputs": [
              {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
              },
              {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
              },
              {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
              }
            ],
            "anonymous": false
          },
          {
            "type": "error",
            "name": "ERC721IncorrectOwner",
            "inputs": [
              {
                "name": "sender",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "owner",
                "type": "address",
                "internalType": "address"
              }
            ]
          },
          {
            "type": "error",
            "name": "ERC721InsufficientApproval",
            "inputs": [
              {
                "name": "operator",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "type": "error",
            "name": "ERC721InvalidApprover",
            "inputs": [
              {
                "name": "approver",
                "type": "address",
                "internalType": "address"
              }
            ]
          },
          {
            "type": "error",
            "name": "ERC721InvalidOperator",
            "inputs": [
              {
                "name": "operator",
                "type": "address",
                "internalType": "address"
              }
            ]
          },
          {
            "type": "error",
            "name": "ERC721InvalidOwner",
            "inputs": [
              {
                "name": "owner",
                "type": "address",
                "internalType": "address"
              }
            ]
          },
          {
            "type": "error",
            "name": "ERC721InvalidReceiver",
            "inputs": [
              {
                "name": "receiver",
                "type": "address",
                "internalType": "address"
              }
            ]
          },
          {
            "type": "error",
            "name": "ERC721InvalidSender",
            "inputs": [
              {
                "name": "sender",
                "type": "address",
                "internalType": "address"
              }
            ]
          },
          {
            "type": "error",
            "name": "ERC721NonexistentToken",
            "inputs": [
              {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "type": "error",
            "name": "OwnableInvalidOwner",
            "inputs": [
              {
                "name": "owner",
                "type": "address",
                "internalType": "address"
              }
            ]
          },
          {
            "type": "error",
            "name": "OwnableUnauthorizedAccount",
            "inputs": [
              {
                "name": "account",
                "type": "address",
                "internalType": "address"
              }
            ]
          }
      ];
      // Crie uma nova instância do contrato
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

      setContract(contractInstance);
    }

    loadContract();
  }, []);

  async function mintNFT() {
    const account = await connectWallet();
    if (!account) return;
  
    if (!contract) return;
  
    // Defina o endereço para o qual o NFT será cunhado
    const toAddress = account; // Use o endereço da conta conectada
  
    // Defina a URI do o tipo de NFT
    const tokenURI = 'mY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1';
    const nftType = 0; // 0 para COMMON, 1 para RARE, 2 para EPIC
  
    // Defina o preço com base no tipo de NFT
    let price;
    if (nftType === 0) {
      price = ethers.utils.parseUnits('0.0075', 'ether').toString();
    } else if (nftType === 1) {
      price = ethers.utils.parseUnits('0.015', 'ether').toString();
    } else if (nftType === 2) {
      price = ethers.utils.parseUnits('0.03', 'ether').toString();
    }
  
    // Cunhe o NFT com um limite de gás manual
    const gasLimit = ethers.utils.hexlify(2000000); // 2,000,000 de gás
    const tx = await contract.safeMint(toAddress, tokenURI, nftType, { value: price, gasLimit: gasLimit });
  
    // Aguarde a transação ser confirmada
    await tx.wait();
  
    console.log('NFT minted!');
  }

  return (
    <div className="App">
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
}

export default App;