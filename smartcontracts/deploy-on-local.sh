forge b --skip test script --build-info

forge script script/deploy.local.s.sol:DeployScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

# script para deploy local
# Path: smartcontracts/deploy-on-testnet.sh
# abrir gitbash
# cd smartcontracts
# chmod +x deploy-on-testnet.sh
# ./deploy-on-testnet.sh
# ou executar diretamente no terminal na pasta smartcontracts  forge script script/deploy.local.s.sol:DeployScript --rpc-url "http://127.0.0.1:8545" --broadcast --sig "run(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266