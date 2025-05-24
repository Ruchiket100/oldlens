import React, { useCallback } from "react";
import { Upload, Camera, UploadIcon, Sparkles } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
	onImageUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onImageUpload }) => {
	// const { toast } = useToast();
	const fileInputRef = React.useRef<HTMLInputElement>(null);

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
			className="max-w-lg mx-auto p-6 flex gap-8 items-center justify-center cursor-pointer animate-fade-in"
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
			<div>
				<button className="bg-accent-200 hover:bg-accent-300 transition-all group rounded-lg font-serif-regular text-primaryFont text-xl flex items-center gap-2 px-6 py-3 border border-primaryFont">
					<Sparkles className="h-6 w-6 group-hover:rotate-90 transition-all" />
					<span>Try for free</span>
				</button>
			</div>
		</div>
	);
};

export default FileUpload;
