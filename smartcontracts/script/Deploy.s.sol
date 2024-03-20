// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Ayahuasca.sol";

contract DeployScript is Script {
    event ContractDeployed(address indexed instance);

    function setUp() public {}

    function run(address initialOwner) public {
        require(initialOwner != address(0), "Initial owner cannot be zero address");

        vm.startBroadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80); // private key do anvil
        // Definir o suply de NFTs e as URLs dos NFTs
        uint256 nftSupply = 170;
        require(nftSupply > 0, "NFT supply must be greater than zero");
        string[] memory commonUrls = new string[](20);
        commonUrls[0] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuP1";
        commonUrls[1] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa93pxnxjQuP2";
        commonUrls[2] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP3";
        commonUrls[3] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP4";
        commonUrls[4] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP5";
        commonUrls[5] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP6";
        commonUrls[6] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP7";
        commonUrls[7] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP8";
        commonUrls[8] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuP9";
        commonUrls[9] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPx";
        commonUrls[10] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPz";
        commonUrls[11] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPv";
        commonUrls[12] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPq";
        commonUrls[13] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPe";
        commonUrls[14] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPr";
        commonUrls[15] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPt";
        commonUrls[16] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPt";
        commonUrls[17] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPt";
        commonUrls[18] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPt";
        commonUrls[19] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPy";
        string[] memory rareUrls = new string[](10);
        rareUrls[0] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPt";
        rareUrls[1] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPu";
        rareUrls[2] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPi";
        rareUrls[3] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPo";
        rareUrls[4] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPp";
        rareUrls[5] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPl";
        rareUrls[6] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPk";
        rareUrls[7] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPj";
        rareUrls[8] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPg";
        rareUrls[9] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPs";
        string[] memory epicUrls = new string[](10);
        epicUrls[0] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPd";
        epicUrls[1] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPF";
        epicUrls[2] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPG";
        epicUrls[3] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPC";
        epicUrls[4] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPX";
        epicUrls[5] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPX";
        epicUrls[6] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPX";
        epicUrls[7] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPX";
        epicUrls[8] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPX";
        epicUrls[9] = "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa94pxnxjQuPX";

        require(commonUrls.length > 0, "Common NFT URLs array cannot be empty");
        require(rareUrls.length > 0, "Rare NFT URLs array cannot be empty");
        require(epicUrls.length > 0, "Epic NFT URLs array cannot be empty");

        // Criar uma nova instância do contrato Ayahuasca
        Ayahuasca instance = new Ayahuasca(initialOwner, nftSupply, commonUrls, rareUrls, epicUrls);
        // Emitir um evento para indicar que o contrato foi implantado
        emit ContractDeployed(address(instance));
        vm.stopBroadcast();
    }
}
// forge script script/Deploy.s.sol:DeployScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// forge script script/Deploy.s.sol:DeployScript --rpc-url https://mainnet.optimism.io  --private-key <your_private_key>
