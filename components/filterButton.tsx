import React from "react";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

interface FilterButtonProps {
	name: string;
	isActive: boolean;
	onClick: () => void;
	previewStyle?: React.CSSProperties;
	isPremium?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
	name,
	isActive,
	onClick,
	previewStyle = {},
	isPremium = false,
}) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"flex flex-col items-center p-2 rounded-md transition-all"
			)}
		>
			<div
				className={cn(
					"w-20 h-20 rounded-md overflow-hidden mb-2 border border-accent-500 ring-0 ring-accent-500 transition-all",
					isActive && "ring-3 "
				)}
				style={{
					...previewStyle,
					backgroundImage: `url(/filter-preview.png)`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				{isPremium && (
					<div className="absolute shrink-0 flex items-center gap-2 px-2 bottom-1 right-1 bg-accent-500/50 backdrop-blur-sm rounded-full p-0.5 shadow-sm">
						<Crown className="h-3 w-3 text-vintage-cream" />{" "}
						<span className="text-xs">Ad</span>
					</div>
				)}
				<div className="w-full h-full bg-gradient-to-br from-vintage-cream to-vintage-sepia"></div>
			</div>
			<span
				className={cn(
					"text-xs font-medium",
					isActive ? "text-accent-100" : "text-vintage-faded"
				)}
			>
				{name}
			</span>
		</button>
	);
};

export default FilterButton;
