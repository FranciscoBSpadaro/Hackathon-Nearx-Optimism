// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {Ayahuasca} from "../src/Ayahuasca.sol";

contract DeployScript is Script {
    event ContractDeployed(address indexed instance);

    function run(address initialOwner) public {
        // Definir o suply de NFTs e as URLs dos NFTs
        uint256 nftSupply = 170;
        string[] memory nftUrls = new string[](31);
        nftUrls[0] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1";
        nftUrls[1] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa93pxnxjQuP2";
        nftUrls[2] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP3";
        nftUrls[3] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP4";
        nftUrls[4] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP5";
        nftUrls[5] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP6";
        nftUrls[6] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP7";
        nftUrls[7] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP8";
        nftUrls[8] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP9";
        nftUrls[9] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPx";
        nftUrls[10] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPz";
        nftUrls[11] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPv";
        nftUrls[12] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPq";
        nftUrls[13] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPe";
        nftUrls[14] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPr";
        nftUrls[15] = "COMMON-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPt";
        nftUrls[16] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPy";
        nftUrls[17] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPu";
        nftUrls[18] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPi";
        nftUrls[19] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPo";
        nftUrls[20] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPp";
        nftUrls[21] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPl";
        nftUrls[22] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPk";
        nftUrls[23] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPj";
        nftUrls[24] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPg";
        nftUrls[25] = "RARE-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPs";
        nftUrls[26] = "EPIC-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPd";
        nftUrls[27] = "EPIC-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPF";
        nftUrls[28] = "EPIC-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPG";
        nftUrls[29] = "EPIC-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPC";
        nftUrls[30] = "EPIC-https://ipfs.io/ipfs/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPX";
        // Cria uma nova instância do contrato Ayahuasca
        Ayahuasca instance = new Ayahuasca(initialOwner, nftSupply, nftUrls);

        // Emitir um evento para indicar que o contrato foi implantado
        emit ContractDeployed(address(instance));
    }
}

// forge script script/Deploy.s.sol:DeployScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// forge script script/Deploy.s.sol:DeployScript --rpc-url https://mainnet.optimism.io  --private-key <your_private_key>
