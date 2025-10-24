import type { NFT } from "../types/NFT.ts";
import { CollectionItem } from "./CollectionItem.tsx";

interface Props {
	collection: NFT[];
	onNFTClick: (nft: NFT) => void;
}

export function Collection({ collection, onNFTClick }: Props) {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="font-semibold text-title text-black">
				More from this collection
			</h2>
			<div className="flex flex-col md:flex-row gap-4 mx-auto">
				{collection.map((nft) => (
					<CollectionItem
						nft={nft}
						key={nft.id}
						onClick={() => onNFTClick(nft)}
					/>
				))}
			</div>
		</div>
	);
}
