import {describe, it, beforeAll, expect, beforeEach} from "bun:test";
import {createPublicClient, createWalletClient, defineChain, http, type WalletClient} from "viem";
import {privateKeyToAccount} from "viem/accounts";
import deployments from "../smart-contracts/deployments/anvil.json" assert {type: 'json'}
import {AmountExceedsMaxDepositError, deposit, MissingAllowanceError, NotEnoughBalanceError} from "./index.ts";
import {parseUnits} from "viem";
import ERC20Abi from './abis/ERC20.json' assert {type: 'json'}
import ERC4626Abi from './abis/ERC4626.json' assert {type: 'json'}
import {waitForTransactionReceipt} from "viem/actions";

const MAX_DEPOSIT = parseUnits("500", 18); // as set in the Vault deployment
const RPC_URL = 'http://127.0.0.1:8545'
const CHAIN = defineChain({
  id: 31337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {http: [RPC_URL]},
  },
})
const client = createPublicClient({chain: CHAIN, transport: http(RPC_URL)})

// Use first Anvil account private key
const WALLET_ADDRESS: `0x${string}` = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const TOKEN_ADDRESS = deployments.token as `0x${string}`
const VAULT_ADDRESS = deployments.vault as `0x${string}`

let walletClient: WalletClient

const ACCOUNT = privateKeyToAccount(PRIVATE_KEY)

beforeAll(async () => {
  walletClient = createWalletClient({account: ACCOUNT, transport: http(RPC_URL), chain: CHAIN});
})

// Reset state
beforeEach(async () => {
  await burnAll();
  await approve(0n);
})

describe('deposit', () => {
  it('throws for insufficient balance', async () => {
    await burnAll();

    const params = {
      wallet: WALLET_ADDRESS,
      vault: VAULT_ADDRESS,
      amount: MAX_DEPOSIT,
    }
    expect(deposit(client, params)).rejects.toThrow(NotEnoughBalanceError)
  })

  it('throws for insufficient allowance', async () => {
    await mint(MAX_DEPOSIT)
    const params = {
      wallet: WALLET_ADDRESS,
      vault: VAULT_ADDRESS,
      amount: MAX_DEPOSIT
    }
    expect(deposit(client, params)).rejects.toThrow(MissingAllowanceError)
  });

  it('throws for exceeded max deposit', async () => {
    await mint(MAX_DEPOSIT + 1n)
    await approve(MAX_DEPOSIT + 1n)

    const params = {
      wallet: WALLET_ADDRESS,
      vault: VAULT_ADDRESS,
      amount: MAX_DEPOSIT + 1n
    }
    expect(deposit(client, params)).rejects.toThrow(AmountExceedsMaxDepositError)
  });

  it('returns a valid transaction object', async () => {
    await mint(MAX_DEPOSIT)
    await approve(MAX_DEPOSIT)

    const params = {
      wallet: WALLET_ADDRESS,
      vault: VAULT_ADDRESS,
      amount: MAX_DEPOSIT,
    }
    const tx = await deposit(client, params);

    expect(tx).toHaveProperty('data');
    expect(tx).toHaveProperty('from', WALLET_ADDRESS);
    expect(tx).toHaveProperty('to', VAULT_ADDRESS);
    expect(tx).toHaveProperty('value', 0n);
    expect(tx).toHaveProperty('gas');

    const sentTxHash = await walletClient.sendTransaction({
      to: tx.to,
      data: tx.data,
      value: tx.value,
      gas: tx.gas,
      account: tx.from,
      chain: CHAIN
    });
    const {status} = await waitForTransactionReceipt(walletClient, {hash: sentTxHash})
    expect(status).toBe('success');
  });
});

const mint = async (tokenBalance: bigint) => {
  const txHash = await walletClient.writeContract({
    address: TOKEN_ADDRESS,
    abi: ERC20Abi.abi,
    functionName: 'mint',
    args: [WALLET_ADDRESS, tokenBalance],
    account: ACCOUNT,
    chain: CHAIN,
  });
  await waitForTransactionReceipt(walletClient, {hash: txHash})
}

const approve = async (amount: bigint) => {
  const txHash = await walletClient.writeContract({
    address: TOKEN_ADDRESS,
    abi: ERC20Abi.abi,
    functionName: 'approve',
    args: [VAULT_ADDRESS, amount],
    account: ACCOUNT,
    chain: CHAIN,
  });
  await waitForTransactionReceipt(walletClient, {hash: txHash})
}

const burnAll = async () => {
  const balance = await client.readContract({
    address: TOKEN_ADDRESS,
    abi: ERC20Abi.abi,
    functionName: 'balanceOf',
    args: [WALLET_ADDRESS],
  }) as bigint
  const txHash = await walletClient.writeContract({
    address: TOKEN_ADDRESS,
    abi: ERC20Abi.abi,
    functionName: 'burn',
    args: [WALLET_ADDRESS, balance],
    account: ACCOUNT,
    chain: CHAIN,
  });
  await waitForTransactionReceipt(walletClient, {hash: txHash})

}
