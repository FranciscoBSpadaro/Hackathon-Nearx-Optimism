// SPDX-License-Identifier: GNU
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Ayahuasca.sol";

contract Optimism is Script {
    event ContractDeployed(address indexed instance);

    function setUp() public {}

    function run(address initialOwner) public {
        require(initialOwner != address(0), "Initial owner cannot be zero address");
        // Definir o suply de NFTs e as URLs dos NFTs
        uint256 nftSupply = 170;
        require(nftSupply > 0, "NFT supply must be greater than zero");
        string[] memory commonUrls = new string[](50);
        commonUrls[0] = "common1.png";
        commonUrls[1] = "common2.png";
        commonUrls[2] = "common3.png";
        commonUrls[3] = "common4.png";
        commonUrls[4] = "common5.png";
        commonUrls[5] = "common6.png";
        commonUrls[6] = "common7.png";
        commonUrls[7] = "common8.png";
        commonUrls[8] = "common9.png";
        commonUrls[9] = "common10.png";
        commonUrls[10] = "common11.png";
        commonUrls[11] = "common12.png";
        commonUrls[12] = "common13.png";
        commonUrls[13] = "common14.png";
        commonUrls[14] = "common15.png";
        commonUrls[15] = "common16.png";
        commonUrls[16] = "common17.png";
        commonUrls[17] = "common18.png";
        commonUrls[18] = "common19.png";
        commonUrls[19] = "common20.png";
        commonUrls[20] = "common21.png";
        commonUrls[21] = "common22.png";
        commonUrls[22] = "common23.png";
        commonUrls[23] = "common24.png";
        commonUrls[24] = "common25.png";
        commonUrls[25] = "common26.png";
        commonUrls[26] = "common27.png";
        commonUrls[27] = "common28.png";
        commonUrls[28] = "common29.png";
        commonUrls[29] = "common30.png";
        commonUrls[30] = "common31.png";
        commonUrls[31] = "common32.png";
        commonUrls[32] = "common33.png";
        commonUrls[33] = "common34.png";
        commonUrls[34] = "common35.png";
        commonUrls[35] = "common36.png";
        commonUrls[36] = "common37.png";
        commonUrls[37] = "common38.png";
        commonUrls[38] = "common39.png";
        commonUrls[39] = "common40.png";
        commonUrls[40] = "common41.png";
        commonUrls[41] = "common42.png";
        commonUrls[42] = "common43.png";
        commonUrls[43] = "common44.png";
        commonUrls[44] = "common45.png";
        commonUrls[45] = "common46.png";
        commonUrls[46] = "common47.png";
        commonUrls[47] = "common48.png";
        commonUrls[48] = "common49.png";
        commonUrls[49] = "common50.png";
        string[] memory rareUrls = new string[](25);
        rareUrls[0] = "rare1.png";
        rareUrls[1] = "rare2.png";
        rareUrls[2] = "rare3.png";
        rareUrls[3] = "rare4.png";
        rareUrls[4] = "rare5.png";
        rareUrls[5] = "rare6.png";
        rareUrls[6] = "rare7.png";
        rareUrls[7] = "rare8.png";
        rareUrls[8] = "rare9.png";
        rareUrls[9] = "rare10.png";
        rareUrls[10] = "rare11.png";
        rareUrls[11] = "rare12.png";
        rareUrls[12] = "rare13.png";
        rareUrls[13] = "rare14.png";
        rareUrls[14] = "rare15.png";
        rareUrls[15] = "rare16.png";
        rareUrls[16] = "rare17.png";
        rareUrls[17] = "rare18.png";
        rareUrls[18] = "rare19.png";
        rareUrls[19] = "rare20.png";
        rareUrls[20] = "rare21.png";
        rareUrls[21] = "rare22.png";
        rareUrls[22] = "rare23.png";
        rareUrls[23] = "rare24.png";
        rareUrls[24] = "rare25.png";
        string[] memory epicUrls = new string[](10);
        epicUrls[0] = "epic1.mp4";
        epicUrls[1] = "epic2.mp4";
        epicUrls[2] = "epic3.mp4";
        epicUrls[3] = "epic4.mp4";
        epicUrls[4] = "epic5.mp4";
        epicUrls[5] = "epic6.mp4";
        epicUrls[6] = "epic7.png";
        epicUrls[7] = "epic8.png";
        epicUrls[8] = "epic9.png";
        epicUrls[9] = "epic10.png";

        require(commonUrls.length > 0, "Common NFT URLs array cannot be empty");
        require(rareUrls.length > 0, "Rare NFT URLs array cannot be empty");
        require(epicUrls.length > 0, "Epic NFT URLs array cannot be empty");

        // Criar uma nova instância do contrato Ayahuasca
        Ayahuasca instance = new Ayahuasca(initialOwner, nftSupply, commonUrls, rareUrls, epicUrls);
        // Emitir um evento para indicar que o contrato foi implantado
        emit ContractDeployed(address(instance));
    }
}

// utilizar deploy-on-mainet.sh que utiliza variaveis de ambiente para deploy
//forge script script/deploy.mainnet.s.sol:Optimism --rpc-url https://mainnet.optimism.io  --private-key <your_private_key>
