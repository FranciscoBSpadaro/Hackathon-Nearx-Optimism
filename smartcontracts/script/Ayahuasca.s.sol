// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Ayahuasca.sol";

contract AyahuascaScript is Script {
  function setUp() public {}

  function run() public {
    // Inicie a transmissão para o Anvil
    vm.startBroadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80); // private key do anvil

    // Define o endereço do proprietário inicial
    address initialOwner = vm.addr(1);
    // Define o fornecimento inicial de NFTs
    uint256 initialSupply = 170;
    // Define as URLs iniciais dos NFTs
    string[] memory initialUrls = new string[](initialSupply);
    // Cria uma nova instância do contrato Ayahuasca
    Ayahuasca instance = new Ayahuasca(initialOwner, initialSupply, initialUrls);

    // Registre o endereço do contrato no console
    console.log("Contrato implantado em %s", address(instance));

    // Pare a transmissão para o Anvil
    vm.stopBroadcast();
  }
}

// forge script script/Ayahuasca.s.sol:AyahuascaScript --rpc-url "http://127.0.0.1:8545" --broadcast