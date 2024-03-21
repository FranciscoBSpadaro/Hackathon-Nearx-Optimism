
Instruções de Desenvolvimento

 ### Configurar docker
- Para configurar o Docker, você precisa seguir as etapas abaixo:

- Instalação do Docker: Primeiro, você precisa instalar o Docker no seu sistema. Você pode baixar o Docker Desktop do site oficial do Docker. Siga as instruções de instalação para o seu sistema operacional específico.

- Verificação da instalação: Para verificar se o Docker foi instalado corretamente, abra um terminal e digite docker --version. Você deve ver a versão do Docker exibida.

- Execução de um contêiner Docker: Para executar um contêiner Docker, você pode usar o comando docker run. Por exemplo, para executar um contêiner com a imagem do Ubuntu, você pode usar docker run -it ubuntu bash.

- Construção de uma imagem Docker: Para construir uma imagem Docker, você precisa de um Dockerfile. Um Dockerfile é um arquivo de texto que contém as instruções para construir a imagem. Você pode usar o comando docker build para construir a imagem. Por exemplo, docker build -t minha-imagem ..

- Docker Compose: Docker Compose é uma ferramenta para definir e executar aplicações Docker multi-contêiner. Você define os serviços que sua aplicação precisa em um arquivo docker-compose.yml, e então pode iniciar todos os serviços com um único comando: docker-compose up.

- Limpeza: Com o tempo, você pode acumular imagens, contêineres e volumes Docker não utilizados que ocupam espaço no seu sistema. Você pode usar comandos como docker system prune para limpar recursos não utilizados.
-

---
instalando foundry no docker :
docker pull ghcr.io/foundry-rs/foundry:latest

abrir terminal onde está o arquivo dockerfile.anvil
cd smartcontracts

docker build -t foundry -f Dockerfile.anvil .
docker run -p 8545:8545 foundry


- Utilizando o docker compose
- criei 2 docker compose 1 para testes e outro para deploy do projeto final
- 
para executar o docker-compose.yml
na raiz do projeto digitar :
- docker-compose up

ou Se você quiser executar os serviços em segundo plano, pode adicionar a opção -d ao comando

docker-compose up -d  


Usando o docker compose de teste o terminal devera exibir o contrato sendo implementado no anvil e o script de mint ser executado

após gerar o docker compose versao final o docker ira criar imagens cada uma com uma tag difirente
para executar usar comandos abaixo :

- docker run -p 8545:8545 hackathon-nearx-optimism-anvil
- docker run -p 8545:8545 hackathon-nearx-optimism-deploy
- docker run -p 3000:3000 hackathon-nearx-optimism-frontend
- docker run -p 8545:8545 hackathon-nearx-optimism-deploy-test
- docker run -p 8545:8545 hackathon-nearx-optimism-test


comandos do foundry para o ambiente desenvolvimento :

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
forge fmt - formata o codigo - lint 

caso apresenta aviso de erro de  compilador na versao do solididy , clicar no erro e o vscode cria um fix e criar uma pasta .vscode




com o anvil rodando pelo docker " requisito hackaton "   abrir um outro terminal  para testar os scripts.

obs: esses script por enquanto so roda no anvil sem o docker compose , pois o docker compose nao está definido esses scripts de teste

executar script de test deploy no anvil:

docker run -p 8545:8545 foundry

cd smartcontracts
forge script script/Ayahuasca.s.sol:AyahuascaScript --rpc-url "http://127.0.0.1:8545" --broadcast
ou
forge script script/Deploy.s.sol:DeployScript --rpc-url "http://127.0.0.1:8545" --broadcast

teste mint pelo anvil :

forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address)" 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

- obs para o front end exibir os nft que uma carteira possui existe o metodo tokenOfOwnerByIndex , esta função é parte do padrão ERC721Enumerable, que é uma extensão do padrão ERC721. O contrato Ayahuasca herda de ERC721 e ERC721URIStorage, mas não de ERC721Enumerable.
- Para resolver este problema,  tem duas opções:

Modificar o contrato inteligente para herdar de ERC721Enumerable e implementar a lógica necessária. 

Modificar o código JavaScript para não depender da função tokenOfOwnerByIndex. Em vez disso, você pode manter um mapeamento em seu contrato de proprietários para IDs de token, e expor uma função para recuperar os IDs de token para um determinado proprietário.
antes :
```
 useEffect(() => {
    async function getNFTs() {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const balance = await contract.balanceOf(account);

        let nfts = [];
        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(account, i);
          const tokenURI = await contract.tokenURI(tokenId);
          nfts.push({ tokenId, tokenURI });
        }

        setNfts(nfts);
      }
    }

    getNFTs();
  }, [account]);
```
depois :
```
  useEffect(() => {
    async function getNFTs() {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        let nfts = [];
        const tokenIds = await contract.tokensOfOwner(account);
        for (let i = 0; i < tokenIds.length; i++) {
            const tokenURI = await contract.tokenURI(tokenIds[i]);
            nfts.push({ tokenId: tokenIds[i], tokenURI });
        }

        setNfts(nfts);
      }
    }

    getNFTs();
  }, [account]);
```
No contrato Optei por alterar apenas as linhas do contrato

```
// Mapeamento de proprietário para lista de IDs de token
mapping(address => uint256[]) private _ownerTokens;

// Função para obter os IDs de token de um proprietário
function tokensOfOwner(address owner) external view returns (uint256[] memory) {
    return _ownerTokens[owner];
}

// Modifique a função mintNft para atualizar o mapeamento _ownerTokens
function mintNft(NftType nftType) public payable {
    // ... código existente ...

    _mint(msg.sender, newTokenId);
    _ownerTokens[msg.sender].push(newTokenId);

    // ... código existente ...
}
```

adicionar  ERC721Enumerable  é mais custoso e poderia gerar conflitos
adicionando erc721enumerable :
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importando as bibliotecas necessárias


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; // Importando ERC721Enumerable

contract Ayahuasca is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    // O restante do contrato permanece o mesmo...

    // Função para verificar se uma interface é suportada
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // O restante do contrato permanece o mesmo...
}
```
'ERC721Enumerable  causou conflito no compilador '  Derived contract must override function "_increaseBalance". Two or more base classes define function with same name and parameter types.(6480) Derived contract must override function "_update". Two or more base classes define function with same name and parameter types.(6480) ' contract Ayahuasca is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable ' 

O erro é devido a um conflito entre as funções _increaseBalance e _update definidas em ERC721 e ERC721Enumerable. Ambos os contratos definem essas funções, mas com implementações diferentes, então quando tenta herdar de ambos, o compilador não sabe qual implementação usar.

Para resolver isso, precisaria sobrescrever essas funções em no contrato Ayahuasca e decidir qual implementação usar. Se  quiser usar a implementação de ERC721Enumerable,  poderia fazer isso da seguinte maneira:

```
contract Ayahuasca is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    // O restante do contrato...

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // O restante do contrato...
}

```
A adição de ERC721Enumerable ao  contrato aumentará o custo do gás para as transações, pois ele mantém um registro de todos os tokens para cada proprietário.  acabei optando por descartar essas mudanças mais custosas.

-------------------------
GERAR ABI
existem varias formas de extrarir o abi
- compilar o codigo no remix , https://remix.ethereum.org/  , compilar o codigo do contrato faz gerar uma pasta artifacts , nessa pasta tem o json com abi , mas mesmo assim fica mais trabalhoso organizar o arquivo.. etc .
- A MELHOR FORMA :
- codigo javascript , criei um codigo para isso  ' extractabi,js ' basta abrir a pasta do arquivo e digitar node extractabi.js , vai gerar um arquivo de saida AyahuascaAbi.json


outras formas menos recomendadas:

forge build --silent
o abi fica na pasta out\Ayahuasca.sol\Ayahuasca.json


esse seria um metodo usando ' jq ' 
forge build --silent && jq '.abi' ./out/Ayahuasca.sol/Ayahuasca.json


-----

test script deploy mainet  : 

forge script script/Deploy.s.sol:DeployScript --rpc-url https://mainnet.optimism.io  --private-key <your_private_key>

- usando anvil sem docker basta abrir o terminal gitbash e digitar : anvil

- iniciar front end
- cd frontend
 npx create-react-app frontend
 ou
 npx create-react-app frontend --template typescript
 npm start


 - crie arquivo .env na pasta smartcontracts
PRIVATE_KEY=0x...
RPC_PROVIDER=https://kovan.optimism.io

# Deploy the contract to the L2 network
# mainet https://mainnet.optimism.io
# testnet https://kovan.optimism.io

- crie arquivo .env na pasta frontend
- REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
- REACT_APP_RPC_URL=http://127.0.0.1:8545

configurar metamask para usar o anvil
para evitar bugs de erro de rpc no metamask utilizar http://localhost:8545
Nome da rede : Localhost 8545
Novo URL da RPC : http://localhost:8545
ID da cadeia : 31337
Símbolo da moeda : GO


pasta artifacts
Para gerar a pasta de artefatos usando o Foundry, você precisa executar o comando de compilação. No terminal, você pode fazer isso com o seguinte comando:



 
