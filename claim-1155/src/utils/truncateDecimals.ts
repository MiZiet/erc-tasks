export function truncateDecimals(value: string, decimals = 2) {
	const [integerPart, decimalPart] = value.split(".");
	if (!decimalPart || decimalPart.length <= decimals) {
		return value;
	}
	return `${integerPart}.${decimalPart.slice(0, decimals)}`;
}
