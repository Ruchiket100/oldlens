import React from "react";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
	name: string;
	isActive: boolean;
	onClick: () => void;
	previewStyle?: React.CSSProperties;
}

const FilterButton: React.FC<FilterButtonProps> = ({
	name,
	isActive,
	onClick,
	previewStyle = {},
}) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"flex flex-col items-center p-2 rounded-md transition-all",
				isActive
					? "bg-vintage-brown/20 ring-1 ring-vintage-brown"
					: "bg-transparent hover:bg-vintage-brown/10"
			)}
		>
			<div
				className="w-16 h-16 rounded-md overflow-hidden mb-2 border border-vintage-faded/30"
				style={previewStyle}
			>
				<div className="w-full h-full bg-gradient-to-br from-vintage-cream to-vintage-sepia"></div>
			</div>
			<span
				className={cn(
					"text-xs font-medium",
					isActive ? "text-vintage-darkBrown" : "text-vintage-faded"
				)}
			>
				{name}
			</span>
		</button>
	);
};

export default FilterButton;
