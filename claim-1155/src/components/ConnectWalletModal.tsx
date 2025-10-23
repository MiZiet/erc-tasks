import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { PrimaryButton } from "./PrimaryButton.tsx";

interface ConnectWalletModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const ConnectWalletModal = ({
	isOpen,
	onOpenChange,
}: ConnectWalletModalProps) => {
	const { connectors, connect, isPending } = useConnect();
	const { isConnected, address } = useAccount();
	const { disconnect } = useDisconnect();

	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay
					className={
						"fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
					}
				/>
				<Dialog.Content
					className={
						"fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 shadow-2xl w-[90vw] max-w-md max-h-[85vh] z-50 focus:outline-none transition-all duration-300 transform data-[state=open]:opacity-100 data-[state=closed]:opacity-0"
					}
				>
					<Dialog.Title className="text-title-big font-bold text-black mb-4">
						{isConnected ? "Wallet Connected" : "Connect Wallet"}
					</Dialog.Title>
					{isConnected ? (
						<>
							<p className="text-text text-grey mb-4 truncate">{address}</p>
							<PrimaryButton
								onClick={() => {
									disconnect();
									onOpenChange(false);
								}}
								label="Disconnect"
								className="w-full"
							/>
						</>
					) : isPending ? (
						<div> Continue in Your wallet application..</div>
					) : (
						<>
							<div className="space-y-3">
								{connectors.map((connector) => (
									<button
										key={connector.uid}
										onClick={() => {
											connect({ connector });
										}}
										className={
											"flex items-center justify-between w-full p-3 my-2 text-title font-medium cursor-pointer text-gray bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
										}
									>
										<span>{connector.name}</span>
									</button>
								))}
							</div>
						</>
					)}
					<Dialog.Close asChild>
						<button
							className="absolute top-3 right-3 text-gray hover:text-gray-600 cursor-pointer"
							aria-label="Close"
						>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
