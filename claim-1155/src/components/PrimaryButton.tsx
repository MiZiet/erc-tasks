interface Props {
	label: string;
	className?: string;
	onClick?: () => void;
}

export function PrimaryButton({ className = "", label, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className={`px-4 py-2 bg-button-primary text-text-primary text-text cursor-pointer shadow-button font-medium ${className}`}
		>
			{label}
		</button>
	);
}
