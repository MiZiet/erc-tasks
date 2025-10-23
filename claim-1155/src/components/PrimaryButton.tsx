interface Props {
	label: string;
	className?: string;
}

export function PrimaryButton({ className = "", label }: Props) {
	return (
		<button
			className={`px-4 py-2 bg-button-primary text-text-primary text-text cursor-pointer shadow-button font-medium ${className}`}
		>
			{label}
		</button>
	);
}
