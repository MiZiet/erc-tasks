import {useQuery} from "@tanstack/react-query";
import {fetchNFTs, type NFT} from "./api/nfts.ts";
import {Collection} from "./components/Collection.tsx";
import {useEffect, useState} from "react";

function App() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const {data, error, isLoading} = useQuery({queryFn: fetchNFTs, queryKey: ['nfts']})

  useEffect(() => {
    if ( !data ) return
    setSelectedNFT(data[0])

  }, [data])

  if ( isLoading || !data ) {
    return 'Loading...'
  }

  if ( error ) {
    return 'An error occurred: ' + error.message
  }

  return (
    <div className='max-w-[1280px] mx-auto '>
      <Collection collection={data.filter(nft => nft.id !== selectedNFT?.id)}/>
    </div>
  )
}

export default App
