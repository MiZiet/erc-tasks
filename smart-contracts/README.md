# Steps to follow to run local node for e2e tests

## Requirements

Forge and Anvil installed. Follow instructions from foundry
book: https://book.getfoundry.sh/getting-started/installation

## Install dependencies

```shell
forge soldeer install
```

## Build contracts

```shell
forge build
```

## Run anvil local node

```shell
anvil
```

## Deploy contracts

Using default anvil account (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266) as a sender

```shell
forge script scripts/Deploy.s.sol:DeployScript \
 --rpc-url http://127.0.0.1:8545 \
  --broadcast \
  --sender 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
