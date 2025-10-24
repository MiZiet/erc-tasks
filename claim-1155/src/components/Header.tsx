import { useState } from "react";
import { formatEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import ETHIcon from "../assets/icons/ETH-icon.svg?react";
import OpenIcon from "../assets/kiln-logo-big.svg?react";
import { truncateAddress } from "../utils/truncateAddress.ts";
import { truncateDecimals } from "../utils/truncateDecimals.ts";
import { ConnectWalletModal } from "./ConnectWalletModal.tsx";
import { PrimaryButton } from "./PrimaryButton.tsx";

export function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isConnected, address } = useAccount();
	const { data: ethBalance } = useBalance({ address });

	return (
		<div className="flex justify-between px-6 py-5 mx-auto max-w-[1440px]">
			<OpenIcon />
			<div className="flex gap-2">
				{ethBalance && (
					<div className="flex gap-2 items-center text-title-big text-black font-semibold">
						<ETHIcon /> {truncateDecimals(formatEther(ethBalance.value))} ETH
					</div>
				)}
				<PrimaryButton
					label={
						isConnected && address ? truncateAddress(address) : "Connect Wallet"
					}
					onClick={() => setIsModalOpen(true)}
				/>
			</div>
			<ConnectWalletModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
		</div>
	);
}
