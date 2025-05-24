"use client";

import { overlayAtom } from "@/utils/store";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function Overlay() {
	const [overlay, setOverlay] = useAtom(overlayAtom);

	const onHide = () => {
		setOverlay(null);
		overlay?.onHide?.();
	};

	useEffect(() => {
		if (!overlay) return;
		const body = document.querySelector("body");
		const currentOverflow = body?.style.getPropertyValue("overflow");
		body?.style.setProperty("overflow", "hidden");
		return () => {
			body?.style.setProperty("overflow", currentOverflow || "auto");
		};
	}, [overlay]);

	return (
		<div
			onClick={onHide}
			className={` backdrop-blur-sm text-primaryFont fixed z-20 transition-all inset-0 ${
				overlay
					? "visible opacity-100 scale-100"
					: "invisible -translate-y-20 opacity-0 scale-110"
			} flex flex-col md:flex-row justify-end md:items-center md:justify-center`}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`md:w-[800px] bg-white/80 rounded-xl p-6 w-full h-[50%] md:h-2/4 
				 overflow-auto`}
			>
				{overlay?.content}
			</div>
		</div>
	);
}
