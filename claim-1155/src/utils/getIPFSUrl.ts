export function getIPFSUrl(ipfsUrl: string) {
	return ipfsUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
}
