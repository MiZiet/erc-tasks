import type { Abi } from "viem";
import { useReadContract } from "wagmi";
import abiJson from "../abis/erc1155.json";

export function useNFTBalance(
	tokenAddress: `0x${string}`,
	owner: string | undefined,
	tokenId: string,
) {
	const { data } = useReadContract({
		address: tokenAddress,
		abi: abiJson as Abi,
		functionName: "balanceOf",
		args: [owner, tokenId],
		query: {
			enabled: !!owner,
		},
	});

	return {
		balance: typeof data === "bigint" ? data : 0n,
	};
}
