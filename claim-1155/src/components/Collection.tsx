import type { NFT } from "../api/nfts";
import { CollectionItem } from "./CollectionItem.tsx";

interface Props {
	collection: NFT[];
}

export function Collection({ collection }: Props) {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="font-semibold text-title text-black">
				More from this collection
			</h2>
			<div className="flex gap-4">
				{collection.map((nft) => (
					<CollectionItem nft={nft} key={nft.id} />
				))}
			</div>
		</div>
	);
}
