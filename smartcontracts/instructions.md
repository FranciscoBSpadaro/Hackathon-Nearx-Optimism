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

projeto gerado no https://wizard.openzeppelin.com/#erc721
baixado para foundry
apos descompactar a pasta abrir terminal gitbash

setup.sh

terminal gitbash:
run :   .setup.sh

abrir outro terminal e digitar anvil para iniciar a blockchain local

executar script :
test deploy anvil
forge script script/Ayahuasca.s.sol:AyahuascaScript --rpc-url "http://127.0.0.1:8545" --broadcast

// forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast 

teste mint nft :
forge script script/AyahuascaMint.s.sol:AyahuascaMintScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run()"


forge script script/Deploy.s.sol:DeployScript --rpc-url https://mainnet.optimism.io  --private-key <your_private_key>


- iniciar front end
 npx create-react-app web3-app
 npx create-react-app web3-app --template typescript
 
