// SPDX-License-Identifier: GNU
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Ayahuasca.sol";

contract AyahuascaTest is Test {
    Ayahuasca ayahuasca;

    // Configuração inicial do contrato de teste
    function setUp() public {
        // Definindo URLs para os NFTs
        string[] memory commonUrls = new string[](2);
        commonUrls[0] = "common1.png";
        commonUrls[1] = "common2.png";
        string[] memory rareUrls = new string[](2);
        rareUrls[0] = "rare1.png";
        rareUrls[1] = "rare2.png";
        string[] memory epicUrls = new string[](2);
        epicUrls[0] = "epic1.mp4";
        epicUrls[1] = "epic2.mp4";
        ayahuasca = new Ayahuasca(address(this), 170, commonUrls, rareUrls, epicUrls);
    }

    // Testa a configuração inicial do contrato
    function testInitialSetup() public {
        assertEq(ayahuasca.nftSupply(), 170); // Verifica se a oferta inicial de NFTs é 170
        assertEq(
            ayahuasca.getBaseURI(), "https://bafybeigfuq3bsmiwzfzlqyvv7fmwbn57czafdocdbqzqxrummiwq4v3hlm.ipfs.w3s.link/"
        ); // Verifica se a URI base está correta
    }

    // Testa a funcionalidade de Mint de NFTs
    function testMintNft() public {
        uint256 initialCount = ayahuasca.getNftCount(Ayahuasca.NftType.COMMON); // Obtém a contagem inicial de NFTs comuns
        ayahuasca.mintNft{value: ayahuasca.COMMON_PRICE()}(Ayahuasca.NftType.COMMON); // Cunha um novo NFT comum
        assertEq(ayahuasca.getNftCount(Ayahuasca.NftType.COMMON), initialCount + 1); // Verifica se a contagem de NFTs comuns aumentou em 1
    }

    // Testa se o Mint de NFTs falha quando a oferta máxima é atingida
    function testMintNftFailsWhenMaxSupplyReached() public {
        for (uint256 i = 0; i < ayahuasca.COMMON_MAX_SUPPLY(); i++) {
            ayahuasca.mintNft{value: ayahuasca.COMMON_PRICE()}(Ayahuasca.NftType.COMMON); // Cunha NFTs comuns até atingir a oferta máxima
        }
        (bool success,) = address(ayahuasca).call{value: ayahuasca.COMMON_PRICE()}(
            abi.encodeWithSignature("mintNft(uint8)", uint8(Ayahuasca.NftType.COMMON))
        );
        assertTrue(!success, "Minting should fail when max supply is reached"); // Verifica se a Mint falha quando a oferta máxima é atingida
    }

    // Testa a funcionalidade de obtenção da URI do token
    function testTokenURI() public {
        ayahuasca.mintNft{value: ayahuasca.COMMON_PRICE()}(Ayahuasca.NftType.COMMON); // Cunha um novo NFT comum
        uint256 tokenId = ayahuasca.getNftCount(Ayahuasca.NftType.COMMON); // Obtém o ID do último NFT cunhado
        string memory expectedURI =
            "https://bafybeigfuq3bsmiwzfzlqyvv7fmwbn57czafdocdbqzqxrummiwq4v3hlm.ipfs.w3s.link/common2.png"; // Define a URI esperada
        string memory actualURI = ayahuasca.tokenURI(tokenId); // Obtém a URI atual do token
        assertEq(actualURI, expectedURI); // Verifica se a URI atual do token é igual à esperada
    }

    // Testa a funcionalidade de obtenção da contagem de NFTs
    function testGetNftCount() public {
        uint256 initialCount = ayahuasca.getNftCount(Ayahuasca.NftType.COMMON); // Obtém a contagem inicial de NFTs comuns
        ayahuasca.mintNft{value: ayahuasca.COMMON_PRICE()}(Ayahuasca.NftType.COMMON); // Cunha um novo NFT comum
        assertEq(ayahuasca.getNftCount(Ayahuasca.NftType.COMMON), initialCount + 1); // Verifica se a contagem de NFTs comuns aumentou em 1
    }

    // Testa a funcionalidade de obtenção do preço de cada tipo de NFT
    function testGetPrices() public {
        assertEq(ayahuasca.getCommonPrice(), 0.0075 ether); // Verifica se o preço do NFT comum está correto
        assertEq(ayahuasca.getRarePrice(), 0.015 ether); // Verifica se o preço do NFT raro está correto
        assertEq(ayahuasca.getEpicPrice(), 0.03 ether); // Verifica se o preço do NFT épico está correto
    }

    // Testa a funcionalidade de obtenção do tipo de um NFT
    function testGetType() public {
        ayahuasca.mintNft{value: ayahuasca.getCommonPrice()}(Ayahuasca.NftType.COMMON); // Cunha um novo NFT comum
        uint256 tokenId = ayahuasca.getNftCount(Ayahuasca.NftType.COMMON); // Obtém o ID do último NFT cunhado
        assertEq(uint256(ayahuasca.getType(tokenId)), uint256(Ayahuasca.NftType.COMMON)); // Verifica se o tipo do NFT está correto
    }

    // Testa a função tokensOfOwner , função necessária para o front end exibir nfts do usuario

    function testTokensOfOwner() public {
        // Cunha alguns NFTs para o endereço deste contrato
        ayahuasca.mintNft{value: ayahuasca.COMMON_PRICE()}(Ayahuasca.NftType.COMMON);
        ayahuasca.mintNft{value: ayahuasca.RARE_PRICE()}(Ayahuasca.NftType.RARE);
        ayahuasca.mintNft{value: ayahuasca.EPIC_PRICE()}(Ayahuasca.NftType.EPIC);

        // Obtém os IDs de token do endereço deste contrato
        uint256[] memory tokenIds = ayahuasca.tokensOfOwner(address(this));

        // Verifica se o número correto de IDs de token foi retornado
        assertEq(tokenIds.length, 3);

        // Verifica se os IDs de token corretos foram retornados
        for (uint256 i = 0; i < tokenIds.length; i++) {
            assertEq(tokenIds[i], i + 1);
        }
    }
}

// forge t  - executar o teste
