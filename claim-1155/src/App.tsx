import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchNFTs, type NFT } from "./api/nfts.ts";
import { Collection } from "./components/Collection.tsx";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { NFTInfo } from "./components/NFTInfo.tsx";
import { NFTView } from "./components/NFTView.tsx";

function App() {
	const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
	const { data, error, isLoading } = useQuery({
		queryFn: fetchNFTs,
		queryKey: ["nfts"],
	});

	useEffect(() => {
		if (!data) return;
		setSelectedNFT(data[0]);
	}, [data]);

	if (isLoading || !data || !selectedNFT) {
		return "Loading...";
	}

	if (error) {
		return "An error occurred: " + error.message;
	}

	return (
		<div>
			<Header />
			<main className="max-w-[1248px] mx-auto my-20 flex flex-col gap-12">
				<div className="flex gap-8 w-full pb-6">
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
