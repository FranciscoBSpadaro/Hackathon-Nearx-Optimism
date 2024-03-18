

---
Configurar docker
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

docker build -t foundry -f Dockerfile.anvil .
docker run -p 8545:8545 foundry

--


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




com o anvil rodando pelo docker " requisito hackaton "   abrir um terminal gitbash para testar os scripts.
executar script de test deploy anvil:
forge script script/Ayahuasca.s.sol:AyahuascaScript --rpc-url "http://127.0.0.1:8545" --broadcast

teste mint :
forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast 
ou
forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run()"


test script deploy mainet  : 

forge script script/Deploy.s.sol:DeployScript --rpc-url https://mainnet.optimism.io  --private-key <your_private_key>

- usando anvil sem docker basta abrir o terminal gitbash e digitar : anvil

- iniciar front end
 npx create-react-app web3-app
 npx create-react-app web3-app --template typescript


 
