import Link from "next/link";
import React from "react";

// import { useAuth } from "@/contexts/AuthContext";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = (props: { rightButton?: React.ReactElement }) => {
	// const { user } = useAuth();
	const { rightButton } = props;

	return (
		<div className="w-full flex items-center justify-between px-4 md:px-50 bg-accent-50/10 backdrop-blur-sm">
			<div className="w-full py-4 gap-1 flex items-center">
				<img src="/logo.png" className="w-14 h-14 " />
				<h1 className="text-2xl font-serif">Oldlens</h1>
			</div>
			{rightButton && (
				<div className="flex shrink-0 py-6">{rightButton}</div>
			)}
		</div>
	);
};

export default Header;
