import { cn } from "@/lib/utils";

export function Button(
	props: React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> & {
		loading?: boolean;
		children: React.ReactNode;
		variant?: "primary" | "secondary" | "hollow";
	}
) {
	const {
		className,
		children,
		loading,
		variant = "primary",
		disabled,
		...rest
	} = props;

	let displayClass = "";

	switch (variant) {
		case "primary":
			displayClass =
				"bg-accent-100 hover:bg-accent-200 text-primaryFont border border-primaryFont";
			break;
		case "secondary":
			displayClass = "bg-accent-200 hover:bg-accent-300 text-primaryFont";
			break;
		case "hollow":
			displayClass =
				"bg-transparent border border-accent-200 hover:bg-accent-100/10 text-text-accent-300 hover:text-accent-100";
			break;
		default:
			displayClass = "bg-accent-100 hover:bg-accent-200 text-primaryFont";
			break;
	}

	return (
		<button
			className={cn(
				` group rounded-lg font-serif-regular text-md flex items-center gap-2 px-4 py-2  transition-all disabled:cursor-not-allowed`,
				displayClass,
				className
			)}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
}
