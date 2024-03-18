source .env

forge script scripts/deploy.testnet.s.sol:Optimism \
    --private-key $OPTIMISM_TESTNET_PRIVATE_KEY \
    --rpc-url $OPTIMISM_TESTNET_RPC_URL \
    --broadcast