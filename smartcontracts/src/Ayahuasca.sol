// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/// @custom:security-contact francisco@fbs-dev.com.br

contract Ayahuasca is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    // Definindo um contador privado para os IDs dos tokens

    Counters.Counter private _tokenIdCounter;
    // Definindo constantes para a oferta máxima e o preço de cada tipo de NFT
    uint256 public constant COMMON_MAX_SUPPLY = 100;
    uint256 public constant RARE_MAX_SUPPLY = 50;
    uint256 public constant EPIC_MAX_SUPPLY = 20;
    uint256 public constant COMMON_PRICE = 0.0075 ether;
    uint256 public constant RARE_PRICE = 0.015 ether;
    uint256 public constant EPIC_PRICE = 0.03 ether;
    // Definindo um enum para os tipos de NFTs

    enum NftType {
        COMMON,
        RARE,
        EPIC
    }
    // Adicionando variáveis de estado para nftSupply e nftUrls

    uint256 public nftSupply;
    string[] public nftUrls;
    // Construtor do contrato

    constructor(address initialOwner, uint256 _nftSupply, string[] memory _nftUrls)
        ERC721("Ayahuasca", "Yahu")
        Ownable(initialOwner)
    {
        nftSupply = _nftSupply;
        nftUrls = _nftUrls;
    }
    // Função para retornar a URI base dos tokens

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }
    // Função para retornar a URI base dos tokens

    function getBaseURI() public pure returns (string memory) {
        return _baseURI();
    }
    // Função para verificar se uma interface é suportada

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    // Função para criar um novo nft

    function safeMint(address to, string memory uri, NftType nftType) public payable returns (uint256) {
        // Definindo o preço e a oferta máxima com base no tipo de NFT
        uint256 price;
        uint256 maxSupply;
        // Verificando se o valor enviado é correto e se a oferta máxima ainda não foi atingida
        if (nftType == NftType.COMMON) {
            price = COMMON_PRICE;
            maxSupply = COMMON_MAX_SUPPLY;
        } else if (nftType == NftType.RARE) {
            price = RARE_PRICE;
            maxSupply = RARE_MAX_SUPPLY;
        } else if (nftType == NftType.EPIC) {
            price = EPIC_PRICE;
            maxSupply = EPIC_MAX_SUPPLY;
        } else {
            revert("Invalid NFT type");
        }

        // Se o remetente não for o proprietário, verifique o preço
        if (msg.sender != owner()) {
            require(msg.value == price, "Ether value sent is not correct");
        }
        require(_tokenIdCounter.current() < maxSupply, "Max supply reached");
        // Incrementando o contador de IDs de tokens e criando um novo nft
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, uri);
        // Transferindo o valor enviado para o proprietário do contrato
        if (msg.value > 0) {
            payable(owner()).transfer(msg.value);
        }
        // Retornando o ID do novo token
        return newTokenId;
    }
    // Função para retornar a URI de um token

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    // Funções para retornar o preço de cada tipo de NFT

    function getCommonPrice() public pure returns (uint256) {
        return COMMON_PRICE;
    }

    function getRarePrice() public pure returns (uint256) {
        return RARE_PRICE;
    }

    function getEpicPrice() public pure returns (uint256) {
        return EPIC_PRICE;
    }
}
