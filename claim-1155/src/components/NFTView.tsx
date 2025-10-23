import type { NFT } from "../api/nfts.ts";
import InstagramIcon from "../assets/icons/instagram-icon.svg?react";
import OpenIcon from "../assets/icons/open-icon.svg?react";
import VerificationBadgeIcon from "../assets/icons/verification-badge-icon.svg?react";
import XIcon from "../assets/icons/x-icon.svg?react";
import KilnLogo from "../assets/kiln-logo.svg?react";
import { getIPFSUrl } from "../utils/getIPFSUrl.ts";
import { IconLabel } from "./IconLabel.tsx";
import { PrimaryButton } from "./PrimaryButton.tsx";
import { SecondaryButton } from "./SecondaryButton.tsx";

interface Props {
	nft: NFT;
}

export function NFTView({ nft }: Props) {
	return (
		<div className="flex flex-col gap-6 w-1/2">
			<img
				src={getIPFSUrl(nft.metadata.image)}
				alt={nft.metadata.name}
				className="w-[608px] h-[608px]"
			/>
			<div className="border-1 border-secondary-border flex flex-col gap-6 p-6">
				<div className="flex gap-4 items-center">
					<div className="relative">
						<KilnLogo />
						<VerificationBadgeIcon className="absolute -bottom-0.5 -right-0.5" />
					</div>
					<div className="flex flex-col">
						<p className="text-black font-semibold">KILN</p>
						<p className="text-text text-grey">@Kiln</p>
					</div>
				</div>
				<p className="text-text text-grey">
					Hundreds of companies use Kiln to earn rewards on their digital
					assets, or to whitelabel earning functionality into their products.
				</p>
				<div className="flex gap-4">
					<IconLabel icon={XIcon} label="@Kiln" />
					<IconLabel icon={InstagramIcon} label="@Kiln" />
				</div>
				<div className="flex gap-2">
					<PrimaryButton label="Website" className="flex-1" />
					<SecondaryButton icon={OpenIcon} />
				</div>
			</div>
		</div>
	);
}
