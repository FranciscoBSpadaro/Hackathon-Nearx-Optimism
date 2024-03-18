source .env

forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_PROVIDER  --private-key $PRIVATE_KEY --network mainnet --gas-price 0 --gas-limit 1000000 --wait
```