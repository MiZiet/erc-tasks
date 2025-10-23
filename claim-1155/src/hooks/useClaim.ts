import { useEffect } from "react";
import { toast } from "sonner";
import type { Abi } from "viem";
import {
	useAccount,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import abiJson from "../abis/erc1155.json";

import type { NFT } from "../types/NFT.ts";

const MAX_UINT256 =
	115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export function useClaim(nft: NFT) {
	const { address } = useAccount();
	const { writeContractAsync, data } = useWriteContract();
	const { status: transactionStatus } = useWaitForTransactionReceipt({
		hash: data,
	});

	useEffect(() => {
		if (data) {
			switch (transactionStatus) {
				case "pending":
					toast.info("Transaction pending...");
					break;
				case "success":
					toast.success("Transaction successful!");
					break;
				case "error":
					toast.error("Transaction failed!");
					break;
			}
		}
	}, [transactionStatus, data]);

	async function claim() {
		const abi = abiJson as Abi;
		const tokenId = nft.id;
		const quantity = 1n;
		const currency = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; // ETH
		const pricePerToken = 0n; // Free mint
		const allowlistProof = {
			proof: [],
			quantityLimitPerWallet: MAX_UINT256,
			pricePerToken: 0n,
			currency: "0x0000000000000000000000000000000000000000",
		};

		try {
			await writeContractAsync({
				address: nft.tokenAddress,
				abi,
				functionName: "claim",
				args: [
					address, // address _receiver,
					tokenId, // uint256 _tokenId,
					quantity, // uint256 _quantity,
					currency, // address _currency,
					pricePerToken, // uint256 _pricePerToken,
					allowlistProof, // AllowlistProof calldata _allowlistProof,
					"0x", // bytes memory _data
				],
				value: 0n,
			});
		} catch {
			toast.error("Transaction not executed!");
		}
	}

	return { claim };
}
