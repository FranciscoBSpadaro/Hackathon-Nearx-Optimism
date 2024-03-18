// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Ayahuasca.sol";

// Define um contrato de teste para o contrato Ayahuasca
contract AyahuascaTest is Test {
    Ayahuasca public instance;

    // Configuração inicial para cada teste
    function setUp() public {
        // Define o endereço do proprietário inicial
        address initialOwner = vm.addr(1);
        // Define o fornecimento inicial de NFTs
        uint256 initialSupply = 100;
        // Define as URLs iniciais dos NFTs
        string[] memory initialUrls = new string[](initialSupply);
        // Cria uma nova instância do contrato Ayahuasca
        instance = new Ayahuasca(initialOwner, initialSupply, initialUrls);
    }
    // Testa a função name() do contrato Ayahuasca
    function testName() public {
        assertEq(instance.name(), "Ayahuasca");
    }

    // Testa a função symbol() do contrato Ayahuasca
    function testSymbol() public {
        assertEq(instance.symbol(), "Yahu");
    }

    // Testa a função owner() do contrato Ayahuasca
    function testOwner() public {
        assertEq(instance.owner(), vm.addr(1));
    }

    // Testa a função getCommonPrice() do contrato Ayahuasca
    function testCommonPrice() public {
        assertEq(instance.getCommonPrice(), 0.0075 ether);
    }

    // Testa a função getRarePrice() do contrato Ayahuasca
    function testRarePrice() public {
        assertEq(instance.getRarePrice(), 0.015 ether);
    }

    // Testa a função getEpicPrice() do contrato Ayahuasca
    function testEpicPrice() public {
        assertEq(instance.getEpicPrice(), 0.030 ether);
    }

    // Testa a função getBaseURI() do contrato Ayahuasca
    function testBaseURI() public {
        assertEq(instance.getBaseURI(), "https://ipfs.io/ipfs/");
    }

    // Testa a função safeMint() do contrato Ayahuasca
    function testSafeMint() public {
        // Cria um novo token e verifica se o proprietário e a URI do token estão corretos
        uint256 tokenId = instance.safeMint{value: instance.getCommonPrice()}(
            vm.addr(2),
            "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
            Ayahuasca.NftType.COMMON
        );
        assertEq(instance.ownerOf(tokenId), vm.addr(2));
        assertEq(
            instance.tokenURI(tokenId),
            "https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU"
        );
    }
}
