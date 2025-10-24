import { useState } from "react";
import { useAccount } from "wagmi";
import OpenIcon from "../assets/kiln-logo-big.svg?react";
import { truncateAddress } from "../utils/truncateAddress.ts";
import { ConnectWalletModal } from "./ConnectWalletModal.tsx";
import { PrimaryButton } from "./PrimaryButton.tsx";

export function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isConnected, address } = useAccount();

	return (
		<div className="flex justify-between px-6 py-5 mx-auto max-w-[1440px]">
			<OpenIcon />
			<PrimaryButton
				label={
					isConnected && address ? truncateAddress(address) : "Connect Wallet"
				}
				onClick={() => setIsModalOpen(true)}
			/>
			<ConnectWalletModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
		</div>
	);
}
