import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Collection } from "./components/Collection.tsx";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { NFTInfo } from "./components/NFTInfo.tsx";
import { NFTView } from "./components/NFTView.tsx";
import { useGetNFTs } from "./hooks/useGetNFTs.ts";
import type { NFT } from "./types/NFT.ts";

function App() {
	const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
	const { data, error, isLoading } = useGetNFTs();

	useEffect(() => {
		if (!data) return;
		setSelectedNFT(data[0]);
	}, [data]);

	if (isLoading) {
		return "Loading...";
	}

	if (error || !data || !selectedNFT) {
		return "An unknown error occurred. Please reload the page.";
	}

	return (
		<div>
			<Toaster richColors />
			<Header />
			<main className="max-w-[1248px] mx-2 md:mx-auto my-20 flex flex-col gap-12">
				<div className="flex flex-col md:flex-row gap-8 w-full pb-6">
					<NFTView nft={selectedNFT} />
					<NFTInfo nft={selectedNFT} />
				</div>
				<Collection
					collection={data.filter((nft) => nft.id !== selectedNFT?.id)}
					onNFTClick={setSelectedNFT}
				/>
			</main>
			<Footer />
		</div>
	);
}

export default App;
