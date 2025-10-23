import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import type { NFT } from "../types/NFT.ts";
import { NFTSchema } from "../validation/nft.ts";

export function useGetNFTs() {
	const { data, error, isLoading } = useQuery({
		queryFn: fetchNFTs,
		queryKey: ["nfts"],
	});
	return { data, error, isLoading };
}

async function fetchNFTs(): Promise<NFT[]> {
	const response = await fetch(
		"https://mint-api-production-7d50.up.railway.app/nfts",
	);

	if (!response.ok) {
		throw new Error("Failed to fetch NFTs");
	}

	const { data, error } = z.array(NFTSchema).safeParse(await response.json());
	if (error) {
		throw new Error(error.message);
	}

	return data;
}
