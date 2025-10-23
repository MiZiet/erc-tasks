import type { NFT } from "../api/nfts.ts";
import ETHIcon from "../assets/icons/ETH-icon.svg?react";
import FavouriteIcon from "../assets/icons/favourite-icon.svg?react";
import UploadIcon from "../assets/icons/upload-icon.svg?react";
import { PrimaryButton } from "./PrimaryButton.tsx";
import { SecondaryButton } from "./SecondaryButton.tsx";

interface Props {
	nft: NFT;
}

export function NFTInfo({ nft }: Props) {
	return (
		<div className="flex flex-col w-1/2 gap-6">
			<div className="flex justify-between">
				<div>
					<p className="text-title-big text-black font-semibold">
						{nft.metadata.name}
					</p>
					<p className="text-text text-grey font-normal">You own 0</p>
				</div>
				<div className="flex gap-2">
					<SecondaryButton icon={FavouriteIcon} />
					<SecondaryButton icon={UploadIcon} />
				</div>
			</div>
			<p className="text-title-small text-grey font-normal">
				{nft.metadata.description}
			</p>
			<div className="flex gap-3">
				{nft.metadata.attributes.map((attribute) => {
					return (
						<div
							className="border-1 border-secondary-border p-[17px] w-[195px]"
							key={attribute.trait_type}
						>
							<div className="text-text-small text-grey uppercase">
								{attribute.trait_type}
							</div>
							<div className="text-text-small text-black pt-1">
								{attribute.value}
							</div>
						</div>
					);
				})}
			</div>
			<div className="h-px bg-secondary-border w-full"></div>
			<div className="flex flex-col gap-2">
				<div className="flex">
					<div className="bg-button-primary py-[3px] px-[9px] font-medium text-text-primary text-text-small flex-none">
						Free mint
					</div>
				</div>
				<div className="flex gap-2 items-center text-title-big text-black font-semibold">
					<ETHIcon /> 0 ETH
				</div>
			</div>
			<PrimaryButton label={"Claim now"} />
		</div>
	);
}
