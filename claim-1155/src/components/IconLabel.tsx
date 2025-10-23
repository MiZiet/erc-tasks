import * as React from "react";

interface Props {
	label: string;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export function IconLabel({ icon: Icon, label }: Props) {
	return (
		<div className="flex gap-2">
			<Icon />
			<span>{label}</span>
		</div>
	);
}
