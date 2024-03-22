// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importando as bibliotecas necessárias
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/// @custom:security-contact francisco@fbs-dev.com.br

// Contrato Ayahuasca que herda de ERC721, ERC721URIStorage e Ownable
contract Ayahuasca is ERC721, ERC721URIStorage, Ownable {
    // Usando a biblioteca Counters para gerenciar contadores
    using Counters for Counters.Counter;

    // Contador para gerenciar IDs de token
    Counters.Counter private _tokenIdCounter;

    // Definindo constantes para o fornecimento máximo e preço de cada tipo de NFT
    uint256 public constant COMMON_MAX_SUPPLY = 100;
    uint256 public constant RARE_MAX_SUPPLY = 50;
    uint256 public constant EPIC_MAX_SUPPLY = 35;
    uint256 public constant COMMON_PRICE = 0.0075 ether;
    uint256 public constant RARE_PRICE = 0.015 ether;
    uint256 public constant EPIC_PRICE = 0.03 ether;

    // Enum para representar os tipos de NFT
    enum NftType {
        COMMON,
        RARE,
        EPIC
    }

    // Variável para armazenar o fornecimento total de NFTs
    uint256 public nftSupply;
    // Variável para armazenar a URI base
    string private baseURI = "https://bafybeigfuq3bsmiwzfzlqyvv7fmwbn57czafdocdbqzqxrummiwq4v3hlm.ipfs.w3s.link/";

    // Mapeamentos para armazenar URLs e contagens de cada tipo de NFT
    mapping(NftType => string[]) public nftUrls;
    // Mapeamento de contagem para cada tipo de NFT Url
    mapping(NftType => uint256) public nftCounts;
    // Mapeamento de ID de token para tipo de NFT
    mapping(uint256 => NftType) private _tokenTypes;
    // Mapeamento de proprietário para lista de IDs de token
    mapping(address => uint256[]) private _ownerTokens;

    // Construtor para inicializar o contrato com o fornecimento total de NFTs e URLs para cada tipo de NFT
    constructor(
        address initialOwner,
        uint256 _nftSupply,
        string[] memory _commonUrls,
        string[] memory _rareUrls,
        string[] memory _epicUrls
    ) ERC721("Ayahuasca", "Yahu") Ownable(initialOwner) {
        nftSupply = _nftSupply;
        nftUrls[NftType.COMMON] = _commonUrls;
        nftUrls[NftType.RARE] = _rareUrls;
        nftUrls[NftType.EPIC] = _epicUrls;
    }

    // Função para Mint de  um novo NFT
    function mintNft(NftType nftType) public payable {
        require(_tokenIdCounter.current() < nftSupply, "All NFTs have been minted");
        require(nftUrls[nftType].length > 0, "No URLs available for this NFT type");

        // Adicionando a verificação de limite para cada tipo de NFT
        if (nftType == NftType.COMMON) {
            require(nftCounts[nftType] < COMMON_MAX_SUPPLY, "Max supply for COMMON NFTs reached");
        } else if (nftType == NftType.RARE) {
            require(nftCounts[nftType] < RARE_MAX_SUPPLY, "Max supply for RARE NFTs reached");
        } else if (nftType == NftType.EPIC) {
            require(nftCounts[nftType] < EPIC_MAX_SUPPLY, "Max supply for EPIC NFTs reached");
        }

        // Selecionando uma URL aleatória para cada nft mintado por tipo de nft
        string memory url = nftUrls[nftType][uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)))
            % nftUrls[nftType].length];

        // Incrementando o contador de IDs de token e cunhando o novo NFT
        _tokenIdCounter.increment();
        // Mint o novo NFT
        uint256 newTokenId = _tokenIdCounter.current();
        _mint(msg.sender, newTokenId);
        // Adicionando o ID de token à lista de tokens do proprietário
        _ownerTokens[msg.sender].push(newTokenId);
        // Armazenando o tipo do NFT
        _tokenTypes[newTokenId] = nftType;
        // Definindo a URI do token
        _setTokenURI(newTokenId, url);

        // Incrementando a contagem para o tipo de NFT
        nftCounts[nftType]++;

        // Verificando o preço
        if (msg.sender != owner()) {
            uint256 price;
            if (nftType == NftType.COMMON) {
                price = COMMON_PRICE;
            } else if (nftType == NftType.RARE) {
                price = RARE_PRICE;
            } else if (nftType == NftType.EPIC) {
                price = EPIC_PRICE;
            }
            require(msg.value == price, "Ether value sent is not correct");
        }
    }
    // Função para obter os IDs de token de um proprietário

    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        return _ownerTokens[owner];
    }

    // Função para retornar a URI base
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
    // Função para obter a URI base

    function getBaseURI() public view returns (string memory) {
        return baseURI;
    }
    // Função para verificar se uma interface é suportada

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Função para obter a URI de um token
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // Funções para obter o preço de cada tipo de NFT
    function getCommonPrice() public pure returns (uint256) {
        return COMMON_PRICE;
    }

    function getRarePrice() public pure returns (uint256) {
        return RARE_PRICE;
    }

    function getEpicPrice() public pure returns (uint256) {
        return EPIC_PRICE;
    }

    // Função para obter a contagem de um tipo de NFT
    function getNftCount(NftType nftType) public view returns (uint256) {
        return nftCounts[nftType];
    }
    // Função para obter o tipo de um NFT

    function getType(uint256 tokenId) public view returns (NftType) {
        return _tokenTypes[tokenId];
    }
}
