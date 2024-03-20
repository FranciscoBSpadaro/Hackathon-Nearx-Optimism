// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Ayahuasca.sol";

contract AyahuascaTest is Test {
    Ayahuasca ayahuasca;

    // Configuração inicial do contrato de teste
    function setUp() public {
        // Definindo URLs para os NFTs
        string[] memory commonUrls = new string[](2);
        commonUrls[0] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1";
        commonUrls[1] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP2";
        string[] memory rareUrls = new string[](2);
        rareUrls[0] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPt";
        rareUrls[1] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuzz";
        string[] memory epicUrls = new string[](2);
        epicUrls[0] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPd";
        epicUrls[1] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQudd";
        ayahuasca = new Ayahuasca(address(this), 170, commonUrls, rareUrls, epicUrls);
    }

    // Testa a configuração inicial do contrato
    function testInitialSetup() public {
        assertEq(ayahuasca.nftSupply(), 170); // Verifica se a oferta inicial de NFTs é 170
        assertEq(ayahuasca.getBaseURI(), "https://ipfs.io/ipfs/"); // Verifica se a URI base está correta
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
        string memory expectedURI = "https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP2"; // Define a URI esperada
        string memory actualURI = ayahuasca.tokenURI(tokenId); // Obtém a URI atual do token
        assertEq(actualURI, expectedURI); // Verifica se a URI atual do token é igual à esperada
    }

    // Testa a funcionalidade de obtenção da contagem de NFTs
    function testGetNftCount() public {
        uint256 initialCount = ayahuasca.getNftCount(Ayahuasca.NftType.COMMON); // Obtém a contagem inicial de NFTs comuns
        ayahuasca.mintNft{value: ayahuasca.COMMON_PRICE()}(Ayahuasca.NftType.COMMON); // Cunha um novo NFT comum
        assertEq(ayahuasca.getNftCount(Ayahuasca.NftType.COMMON), initialCount + 1); // Verifica se a contagem de NFTs comuns aumentou em 1
    }

    // Testa a funcionalidade de obtenção do preço de NFTs comuns
    function testGetCommonPrice() public {
        assertEq(ayahuasca.getCommonPrice(), 0.0075 ether); // Verifica se o preço dos NFTs comuns é 0.0075 ether
    }

    // Testa a funcionalidade de obtenção do preço de NFTs raros
    function testGetRarePrice() public {
        assertEq(ayahuasca.getRarePrice(), 0.015 ether); // Verifica se o preço dos NFTs raros é 0.015 ether
    }

    // Testa a funcionalidade de obtenção do preço de NFTs épicos
    function testGetEpicPrice() public {
        assertEq(ayahuasca.getEpicPrice(), 0.03 ether); // Verifica se o preço dos NFTs épicos é 0.03 ether
    }

    // Testa a funcionalidade de obtenção da URL de NFTs comuns
    function testGetCommonUrl() public {
        string memory url = ayahuasca.getCommonUrl(0); // Obtém a URL do primeiro NFT comum
        assertEq(url, "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1"); // Verifica se a URL obtida é a esperada
    }

    // Testa a funcionalidade de obtenção da URL de NFTs raros
    function testGetRareUrl() public {
        string memory url = ayahuasca.getRareUrl(0); // Obtém a URL do primeiro NFT raro
        assertEq(url, "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPt"); // Verifica se a URL obtida é a esperada
    }

    // Testa a funcionalidade de obtenção da URL de NFTs épicos
    function testGetEpicUrl() public {
        string memory url = ayahuasca.getEpicUrl(0); // Obtém a URL do primeiro NFT épico
        assertEq(url, "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPd"); // Verifica se a URL obtida é a esperada
    }
}

// forge t  - executar o teste
