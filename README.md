## Nome Equipe - Optimistic-Shaman
- Membros : [FranciscoBS89](https://github.com/FranciscoBSpadaro)
## Ayahuasca NFT
Pagina e Contrato de Mint de  NFT Ayahuasca $Yahu
- Suply Total :  185
  - 100 Comun : 50 tipos de nft url  Comum
  - 50 Raro : 25 tipos de nft url Raro
  - 35 Epico : 10 tipos de nft url Epico   4 Imagens + 6 Imagens animadas
- Nft ipfs urls total : 85
- Total Supply 185 NFTs

- Mint Randomico , ao comprar um nft comum raro ou epico , o nft tipo de imagen url é aleatorio 
- As imagens e videos dos nfts serão distribuidos na rede  ipfs.
-  Preços nfts : 
   - COMMON_PRICE = 0.0075 ether;
   - RARE_PRICE = 0.015 ether;
   - EPIC_PRICE = 0.03 ether;
-  Será possivel Receber Airdrop de nft comuns atraves de tarefas como compartilhar em redes sociais
-  Tecnologias Utilizadas:
   - Frontend: Javascript, (React.js)
   - SmartContracts: Solidity
   - Framework Foundry

- Prévia de NFT :
![8](https://github.com/FranciscoBSpadaro/Hackathon-Nearx-Optimism/assets/69543568/8eff1a52-afdf-4366-a812-d393923615d9)

- Prévia Página inicial
  ![image](https://github.com/FranciscoBSpadaro/Hackathon-Nearx-Optimism/assets/69543568/97fbc4dc-2092-4d91-a994-b62edadd0a71)


## Contrato Ayahuasca

Detalhes do Contrato:

- O contrato Ayahuasca é um contrato inteligente Ethereum escrito em Solidity que implementa um token ERC721 Compativel com a Rede Optimism. 
- Este contrato permite a criação (mint) de tokens não fungíveis (NFTs) de três tipos diferentes: COMMON, RARE e EPIC.

### Funcionalidades
- Construtor
  -  O construtor do contrato inicializa o contrato com o fornecimento total de NFTs e URLs para cada tipo de NFT. 
  -  O fornecimento total de NFTs é definido pelo parâmetro _nftSupply. 
  -  As URLs para cada tipo de NFT são definidas pelos parâmetros _commonUrls, _rareUrls e _epicUrls.

- Mint NFT
  - A função mintNft permite a criação de um novo NFT de um tipo específico. 
  - A função verifica se o fornecimento total de NFTs não foi excedido e se há URLs disponíveis para o tipo de NFT especificado. 
  - Além disso, a função verifica se o fornecimento máximo para o tipo de NFT especificado não foi atingido.

- Tokens de um Proprietário
  - A função tokensOfOwner retorna uma lista de IDs de token de um proprietário específico.

- URI Base
  - A função _baseURI retorna a URI base que é usada para construir a URI de cada token. A função getBaseURI também retorna a URI base.

- Interface Suportada
  - A função supportsInterface verifica se uma interface específica é suportada pelo contrato.

- URI do Token
A função tokenURI retorna a URI de um token específico.

- Preço do NFT
As funções getCommonPrice, getRarePrice e getEpicPrice retornam o preço de cada tipo de NFT.

- Contagem de NFT
A função getNftCount retorna a contagem de um tipo de NFT específico , útil para o front end exibir a contagem de nfts do Supply.

- Tipo de NFT
A função getType retorna o tipo de um NFT específico ,  útil para o front end definir os nfts da carteira conectada.

- Considerações de Segurança
  - Este contrato foi desenvolvido com a segurança em mente e segue as melhores práticas de desenvolvimento de contratos inteligentes. 
  - No entanto, é importante realizar uma auditoria de segurança antes de usar este contrato em um ambiente de produção.


- Modelagem:
- ![MODELAGEm](https://github.com/FranciscoBSpadaro/Hackathon-Nearx-Optimism/assets/69543568/22ec285d-0a3d-48e7-9ce7-ecc04e49274f)



