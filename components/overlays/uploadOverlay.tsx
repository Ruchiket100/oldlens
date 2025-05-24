import React, { useCallback } from "react";
import { Upload, Image as ImageIcon, ImageDown } from "lucide-react";
import { useAtom } from "jotai";
import { overlayAtom, uploadedImageAtom } from "@/utils/store";
import { useRouter } from "next/navigation";

const UploadOverlay = () => {
	const fileInputRef = React.useRef<HTMLInputElement>(null);
	const [, setUploadedImage] = useAtom(uploadedImageAtom);
	const [, setOverlay] = useAtom(overlayAtom);
	const router = useRouter();

	const onImageUpload = (file: File) => {
		setUploadedImage(file);
		router.push("/edit");
		setOverlay(null);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (file.type.startsWith("image/")) {
				onImageUpload(file);
			} else {
				// toast({
				// 	title: "Invalid file type",
				// 	description: "Please upload an image file.",
				// 	variant: "destructive",
				// });
			}
		}
	};

	const handleDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			event.stopPropagation();

			const files = event.dataTransfer.files;
			if (files && files.length > 0) {
				const file = files[0];
				if (file.type.startsWith("image/")) {
					onImageUpload(file);
				} else {
					// toast({
					// 	title: "Invalid file type",
					// 	description: "Please upload an image file.",
					// 	variant: "destructive",
					// });
				}
			}
		},
		[onImageUpload]
	);

	const handleDragOver = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			event.stopPropagation();
		},
		[]
	);

	const triggerFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div
			className="w-full h-full border-primaryFont/30 border-2 border-spacing-8 border-dashed  rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer animate-fade-in"
			onClick={triggerFileInput}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
			<input
				type="file"
				ref={fileInputRef}
				className="hidden"
				onChange={handleFileChange}
				accept="image/*"
			/>
			<div className=" h-20 w-20 rounded-full flex items-center justify-center mb-6">
				<ImageDown className="h-14 w-14 text-vintage-brown" />
			</div>
			<h3 className="text-3xl font-serif font-medium mb-2">
				Upload Your Photo
			</h3>
			<p className="text-sm text-primaryFont/80 text-center mb-6">
				Drag & drop your image here or click to browse
			</p>
			<button className="flex items-center gap-2 px-4 py-2 rounded-md bg-accent-200 hover:bg-accent-300 text-primaryFont transition-all font-semibold">
				<Upload className="h-4 w-4" />
				<span>Upload Image</span>
			</button>
		</div>
	);
};

export default UploadOverlay;
