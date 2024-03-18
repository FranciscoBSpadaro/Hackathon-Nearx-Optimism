
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

teste mint pelo anvil :

forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address)" 0x70997970C51812dc3A010C7d01b50e0d17dc79C8


-------------------------

test script deploy mainet  : 

forge script script/Deploy.s.sol:DeployScript --rpc-url https://mainnet.optimism.io  --private-key <your_private_key>

- usando anvil sem docker basta abrir o terminal gitbash e digitar : anvil

- iniciar front end
- cd frontend
 npx create-react-app frontend
 npx create-react-app frontend --template typescript


 
