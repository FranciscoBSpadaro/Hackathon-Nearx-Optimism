source .env

forge script script/deploy.testnet.s.sol:OptimismTestNet \
    --private-key $OPTIMISM_TESTNET_PRIVATE_KEY \
    --rpc-url $OPTIMISM_TESTNET_RPC_URL \
    --broadcast \
    --sig "run(address)" 000


    # --sig "run(address)" substitua ' 000 ' E Adicione o endereço da sua carteira , nao é a private key !!

    # execute :
    # . deploy-on-testnet.sh 