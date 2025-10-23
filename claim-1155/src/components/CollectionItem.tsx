import type { NFT } from "../api/nfts";
import { getIPFSUrl } from "../utils/getIPFSUrl.ts";

interface Props {
	nft: NFT;
	onClick: () => void;
}

export function CollectionItem({ nft, onClick }: Props) {
	return (
		<div className="flex flex-col gap-2 cursor-pointer" onClick={onClick}>
			<img
				src={getIPFSUrl(nft.metadata.image)}
				alt={nft.metadata.name}
				className="w-[300px] h-[300px]"
			/>
			<div>
				<div className="font-semibold text-title-small text-black">
					{nft.metadata.name}
				</div>
				<div className="text-text text-grey">0.0 ETH</div>
			</div>
		</div>
	);
}
