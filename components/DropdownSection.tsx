import React, { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DropdownSectionProps {
	title: string;
	children: ReactNode;
	defaultOpen?: boolean;
}

const DropdownSection: React.FC<DropdownSectionProps> = ({
	title,
	children,
	defaultOpen = true,
}) => {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className="mb-4 w-full pb-2">
			<button
				className="flex flex-1 items-center justify-between w-full text-lg font-serif font-medium text-vintage-darkBrown focus:outline-none mb-2"
				onClick={() => setOpen((prev) => !prev)}
				type="button"
			>
				<span>{title}</span>
				{open ? (
					<ChevronUp className="h-5 w-5" />
				) : (
					<ChevronDown className="h-5 w-5" />
				)}
			</button>
			{open && <div>{children}</div>}
		</div>
	);
};

export default DropdownSection;
