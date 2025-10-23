export interface NFT {
	chainId: number;
	id: string;
	metadata: {
		name: string;
		description: string;
		image: string;
		attributes: {
			trait_type: string;
			value: string;
		}[];
	};
	tokenAddress: string;
	tokenURI: string;
	type: string;
}

export async function fetchNFTs(): Promise<NFT[]> {
	const response = await fetch(
		"https://mint-api-production-7d50.up.railway.app/nfts",
	);

	if (!response.ok) {
		throw new Error("Failed to fetch NFTs");
	}

	// todo add proper typing
	return response.json();
}
