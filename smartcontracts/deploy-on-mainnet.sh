source .env

forge script scripts/deploy.mainnet.s.sol:Optimism \
    --private-key $OPTIMISM_PRIVATE_KEY \
    --rpc-url $OPTIMISM_RPC_URL \
    --broadcast