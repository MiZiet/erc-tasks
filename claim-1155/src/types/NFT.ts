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
	tokenAddress: `0x${string}`;
	tokenURI: string;
	type: string;
}
