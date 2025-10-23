import * as React from "react";

interface Props {
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export function SecondaryButton({ icon: Icon }: Props) {
	return (
		<button className="w-[36px] h-[36px] border-1 flex items-center justify-center cursor-pointer border-secondary-border shadow-button">
			<Icon />
		</button>
	);
}
