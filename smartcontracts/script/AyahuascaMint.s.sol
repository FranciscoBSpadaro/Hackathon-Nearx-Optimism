// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Ayahuasca.sol";

// script mint de test no anvil
contract AyahuascaMintScript is Script {
  Ayahuasca public ayahuasca = Ayahuasca(0x5FbDB2315678afecb367f032d93F642f64180aa3);

  function run(address userAddress) public {
    // Inicie a transmissão para o Anvil
    vm.startBroadcast(0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d); // private key do fake usuario anvil

    // Simule a mint de NFTs
    ayahuasca.safeMint{value: 0.0075 ether}(userAddress, "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1", Ayahuasca.NftType.COMMON); // economia de gas
    ayahuasca.safeMint{value: ayahuasca.getRarePrice()}(userAddress, "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa93pxnxjQuP2", Ayahuasca.NftType.RARE);
    ayahuasca.safeMint{value: ayahuasca.getEpicPrice()}(userAddress, "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP3", Ayahuasca.NftType.EPIC);

    // Pare a transmissão para o Anvil
    vm.stopBroadcast();
  }
}

// forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address)" 0x70997970C51812dc3A010C7d01b50e0d17dc79C8