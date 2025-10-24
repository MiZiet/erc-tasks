import { toast } from "sonner";
import { useAccount } from "wagmi";
import ETHIcon from "../assets/icons/ETH-icon.svg?react";
import FavouriteIcon from "../assets/icons/favourite-icon.svg?react";
import UploadIcon from "../assets/icons/upload-icon.svg?react";
import { useClaim } from "../hooks/useClaim.ts";
import { useNFTBalance } from "../hooks/useNFTBalance.ts";
import type { NFT } from "../types/NFT.ts";
import { PrimaryButton } from "./PrimaryButton.tsx";
import { SecondaryButton } from "./SecondaryButton.tsx";

interface Props {
	nft: NFT;
}

export function NFTInfo({ nft }: Props) {
	const { claim } = useClaim(nft);
	const { address } = useAccount();
	const { balance } = useNFTBalance(nft.tokenAddress, address, nft.id);

	const handleClaim = async () => {
		if (!address) {
			toast.error("Please connect your wallet to claim the NFT.");
		} else {
			await claim();
		}
	};

	return (
		<>
			<div className="flex flex-col w-full md:w-1/2 gap-6">
				<div className="flex justify-between">
					<div>
						<p className="text-title-big text-black font-semibold">
							{nft.metadata.name}
						</p>
						<p className="text-medium text-grey font-normal">
							You own {balance}
						</p>
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
								className="border-1 border-primary-border p-[17px] w-[195px]"
								key={attribute.trait_type}
							>
								<div className="text-small text-grey uppercase">
									{attribute.trait_type}
								</div>
								<div className="text-small text-black pt-1">
									{attribute.value}
								</div>
							</div>
						);
					})}
				</div>
				<div className="h-px bg-primary-border w-full"></div>
				<div className="flex flex-col gap-2">
					<div className="flex">
						<div className="bg-button-primary py-[3px] px-[9px] font-medium text-text-primary text-small flex-none">
							Free mint
						</div>
					</div>
					<div className="flex gap-2 items-center text-title-big text-black font-semibold">
						<ETHIcon /> 0 ETH
					</div>
				</div>
				<PrimaryButton label="Claim now" onClick={handleClaim} />
			</div>
		</>
	);
}
