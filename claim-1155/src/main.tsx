import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseSepolia } from "viem/chains";
import { createConfig, http, WagmiProvider } from "wagmi";
import { coinbaseWallet, injected, metaMask } from "wagmi/connectors";
import App from "./App.tsx";

const queryClient = new QueryClient();

export const config = createConfig({
	chains: [baseSepolia],
	transports: {
		[baseSepolia.id]: http("https://sepolia.base.org"),
	},
	connectors: [metaMask(), injected(), coinbaseWallet()],
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</WagmiProvider>
	</StrictMode>,
);
