import { z } from "zod";

// Ethereum address type
const AddressSchema = z
	.string()
	.regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address")
	.transform((val) => val as `0x${string}`);

const AttributeSchema = z.object({
	trait_type: z.string(),
	value: z.string(),
});

const MetadataSchema = z.object({
	name: z.string(),
	description: z.string(),
	image: z.string(),
	attributes: z.array(AttributeSchema),
});

export const NFTSchema = z.object({
	chainId: z.number(),
	id: z.string(),
	metadata: MetadataSchema,
	tokenAddress: AddressSchema,
	tokenURI: z.string(),
	type: z.string(),
});
