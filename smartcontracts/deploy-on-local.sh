forge b --skip test script --build-info

forge script script/deploy.local.s:DeployScript \
 --rpc-url "http://127.0.0.1:8545" \
 --build-info \
 --broadcast \
 --verbosity \
 --sig "run(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266


python deploy.py

# script para deploy local
# Path: smartcontracts/deploy-on-testnet.sh
# abrir gitbash
# cd smartcontracts
# chmod +x deploy-on-testnet.sh
# ./deploy-on-testnet.sh