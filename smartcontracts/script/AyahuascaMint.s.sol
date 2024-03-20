// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Ayahuasca.sol";

contract AyahuascaMintScript is Script {
    event NftMinted(uint256 indexed tokenId);

    function run(address ayahuascaAddress, uint256 nftType, uint256 etherAmount) external payable {
        // Inicie a transmissão para o Anvil
        vm.startBroadcast(0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d); // private key do fake usuario anvil
        // Converter o valor do tipo de NFT para o enum NftType
        Ayahuasca.NftType nftTypeEnum = Ayahuasca.NftType(nftType);

        // Criar uma instância do contrato Ayahuasca
        Ayahuasca ayahuasca = Ayahuasca(ayahuascaAddress);

        // Chamar a função mintNft do contrato Ayahuasca
        ayahuasca.mintNft{value: etherAmount}(nftTypeEnum);

        // Emitir o evento NftMinted com o ID do token minted
        emit NftMinted(ayahuasca.nftSupply());

        // Pare a transmissão para o Anvil
        vm.stopBroadcast();
    }
}

// Neste comando de teste , 0x5fbdb2315678afecb367f032d93f642f64180aa3 é o endereço do contrato Ayahuasca e 0 é o tipo de NFT que você deseja mint (0 para COMMON, 1 para RARE, 2 para EPIC). 0.0075 é o valor do nft comum
// comum - forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address,uint256,uint256)" 0x5fbdb2315678afecb367f032d93f642f64180aa3 0 7500000000000000
// raro -  forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address,uint256,uint256)" 0x5fbdb2315678afecb367f032d93f642f64180aa3 1 15000000000000000
// epico - forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address,uint256,uint256)" 0x5fbdb2315678afecb367f032d93f642f64180aa3 2 30000000000000000
