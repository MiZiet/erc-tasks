import OpenIcon from "../assets/kiln-logo-big.svg?react";
import { PrimaryButton } from "./PrimaryButton.tsx";

export function Header() {
	return (
		<div className="flex justify-between px-6 py-5">
			<OpenIcon />
			<PrimaryButton label={"Connect Wallet"} />
		</div>
	);
}
