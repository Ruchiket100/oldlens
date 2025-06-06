"use client";
import AdBanner from "@/components/adBanner";
import Header from "@/components/Header";
import UploadOverlay from "@/components/overlays/uploadOverlay";
import PhotoEditor from "@/components/photoEditor";
import Texture from "@/components/texture";
import { overlayAtom } from "@/utils/store";
import { useAtom } from "jotai";
import { Camera, DownloadIcon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
	{
		icon: <Camera className="h-10 w-10 text-accent-200" />,
		title: "Upload Your Photo",
		description: "Start by uploading an image from your device.",
	},
	{
		icon: <Sparkles className="h-10 w-10 text-accent-200" />,
		title: "Apply Filters",
		description: "Choose from a variety of vintage filters and effects.",
	},
	{
		icon: <DownloadIcon className="h-10 w-10 text-accent-200" />,
		title: "Download & Share",
		description: "Save your vintage creation to your device.",
	},
];

export default function Home() {
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	const [initialize, setIntialize] = useState(false);
	const [overlay, setOverlay] = useAtom(overlayAtom);

	useEffect(() => {
		if (!initialize) {
			setIntialize(true);
			// initialize = true;
		}
	}, []);

	const handleReset = () => {
		setUploadedImage(null);
	};

	return (
		<div className="min-h-screen h-full flex flex-col overflow-x-hidden w-screen text-white bg-gradient-to-t from-accent-900 to-40% to-black relative">
			<Texture className="fixed opacity-30 mix-blend-screen object-cover w-full h-full z-[999] pointer-events-none" />

			<Header
				rightButton={
					<button className="bg-accent-200 hover:bg-accent-300 transition-all group rounded-lg font-serif-regular text-primaryFont text-md flex items-center gap-2 px-4 py-2 border border-primaryFont">
						<Sparkles className="h-5 w-5 group-hover:rotate-90 transition-all" />
						<span>Try for free</span>
					</button>
				}
			/>
			<AdBanner
				dataAdFormat="auto"
				dataFullWidthResponsive={true}
				dataAdSlot="4602885524" // Replace with your actual ad slot ID
			/>
			<main className="flex h-full py-10 px-4">
				<div className="mx-auto">
					{!uploadedImage ? (
						<>
							<div className="text-center mb-12">
								<br />
								<br />
								<br />

								<h2 className="text-7xl tracking-tight font-serif-regular text- mb-3">
									Transform your{" "}
									<span className="text-accent-200 italic tracking-tight font-serif-regular">
										photos
									</span>
								</h2>
								<p className="text-lg text-primaryLightfont max-w-2xl mx-auto">
									Add vintage flair to your images with our
									collection of nostalgic filters and effects.
								</p>
							</div>
							<button
								onClick={() => {
									setOverlay({
										content: <UploadOverlay />,
										onHide: () => setOverlay(null),
									});
								}}
								className="bg-accent-200 mx-auto hover:bg-accent-300 transition-all group rounded-lg font-serif-regular text-primaryFont text-xl flex items-center gap-2 px-6 py-3 border border-primaryFont"
							>
								<Sparkles className="h-6 w-6 group-hover:rotate-90 transition-all" />
								<span>Try for free</span>
							</button>
							<br />
							<br />
							<br />
							<div className="flex h-100 pointer-events-none -rotate-20  -translate-x-50 relative justify-center items-center">
								{Array(5)
									.fill(0)
									.map((_, index) => (
										<div
											style={{
												rotate: initialize
													? `${index * 7}deg`
													: "0deg",
												transform: initialize
													? `translateX(${
															index * 100
													  }px)`
													: "0px",
											}}
											className={`w-[300px] aspect-square bg-accent-300 border-4 border-white rotate-${
												index * 5
											} absolute transition-all rounded-sm ease-in-out duration-500`}
											key={index}
										></div>
									))}
							</div>
							<br />
							<br />
							<br />
							<br />

							<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
								{features.map((feature, idx) => (
									<div
										key={idx}
										className="flex flex-col items-center text-center p-4"
									>
										<div className="h-20 w-20 bg-gradient-to-t from-accent-400/30 to-40% to-accent-900/70 border-2 border-accent-100/30 rounded-xl flex items-center justify-center mb-6">
											{feature.icon}
										</div>
										<h3 className="font-serif text-2xl font-medium text-vintage-darkBrown mb-2">
											{feature.title}
										</h3>
										<p className="text-sm max-w-80 text-primaryLightfont">
											{feature.description}
										</p>
									</div>
								))}
							</div>
						</>
					) : (
						<PhotoEditor
							imageFile={uploadedImage}
							onReset={handleReset}
						/>
					)}
				</div>
			</main>
		</div>
	);
}
