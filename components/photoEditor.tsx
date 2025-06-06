import React, { useState, useRef, useEffect } from "react";
import {
	Download,
	Undo2,
	Loader2,
	Type,
	ChevronDown,
	Crown,
} from "lucide-react";
import { toast } from "sonner";
import FilterButton from "./filterButton";
import Slider from "./slider";
import { Textarea } from "./ui/textarea";

import {
	FilterSettings,
	FilterType,
	defaultFilterSettings,
	presetFilters,
	generateFilterStyle,
	processImage,
	downloadImage,
	loadImage,
} from "@/utils/imageUtils";
import { Button } from "./ui/button";

interface PhotoEditorProps {
	imageFile: File;
	onReset: () => void;
}

const PhotoEditor: React.FC<PhotoEditorProps> = ({ imageFile, onReset }) => {
	const [settings, setSettings] = useState<FilterSettings>({
		...defaultFilterSettings,
	});
	const [selectedFilter, setSelectedFilter] =
		useState<FilterType>("original");
	const [isProcessing, setIsProcessing] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>("");
	const [showCaptionInput, setShowCaptionInput] = useState(false);
	const [caption, setCaption] = useState("");
	const [captionColor, setCaptionColor] = useState<string>("#FEF7CD");

	const imageRef = useRef<HTMLImageElement>(null);
	const inputCanvasRef = useRef<HTMLCanvasElement>(null);
	const outputCanvasRef = useRef<HTMLCanvasElement>(null);
	const [showAdjustment, setShowAdjustment] = useState(false);
	const [showFilters, setShowFilters] = useState(true);
	// Load image when file changes
	useEffect(() => {
		const loadAndSetupImage = async () => {
			try {
				setIsProcessing(true);
				const imgUrl = URL.createObjectURL(imageFile);
				setImageUrl(imgUrl);

				const img = await loadImage(imageFile);

				if (inputCanvasRef.current && outputCanvasRef.current) {
					// Set canvas dimensions
					const maxWidth = 1200;
					const maxHeight = 800;
					let width = img.width;
					let height = img.height;

					// if (width > maxWidth) {
					// 	const ratio = maxWidth / width;
					// 	width = maxWidth;
					// 	height = height * ratio;
					// }

					// if (height > maxHeight) {
					// 	const ratio = maxHeight / height;
					// 	height = height * ratio;
					// 	width = width * ratio;
					// }

					inputCanvasRef.current.width = width;
					inputCanvasRef.current.height = height;
					outputCanvasRef.current.width = width;
					outputCanvasRef.current.height = height;

					// Draw original image to input canvas
					const inputCtx = inputCanvasRef.current.getContext("2d");
					if (inputCtx) {
						inputCtx.clearRect(0, 0, width, height);
						inputCtx.drawImage(img, 0, 0, width, height);

						// Initial processing
						processImage(
							inputCanvasRef.current,
							outputCanvasRef.current,
							settings
						);
					}
				}
			} catch (error) {
				console.error("Error loading image:", error);
				toast("Error loading image. Please try again.");
			} finally {
				setIsProcessing(false);
			}
		};

		loadAndSetupImage();
	}, [imageFile]);

	// Process image when settings change
	useEffect(() => {
		if (
			inputCanvasRef.current &&
			outputCanvasRef.current &&
			!isProcessing
		) {
			processImage(
				inputCanvasRef.current,
				outputCanvasRef.current,
				settings
			);

			// Add caption if it exists
			if (caption && outputCanvasRef.current) {
				const ctx = outputCanvasRef.current.getContext("2d");
				if (ctx) {
					const canvas = outputCanvasRef.current;
					const fontSize = Math.max(
						16,
						Math.floor(canvas.width / 30)
					); // Responsive font size

					ctx.font = `italic ${fontSize}px Arial`;
					ctx.textAlign = "center";

					// Calculate text metrics to create background
					const textWidth = ctx.measureText(caption).width;
					const padding = fontSize * 0.3;

					// Position caption at the bottom center of the image
					const x = canvas.width / 2;
					const y = canvas.height - fontSize - padding;

					// Draw caption text
					ctx.fillStyle = captionColor;
					ctx.fillText(caption, x, y);
				}
			}
		}
	}, [settings, isProcessing, caption, captionColor]);

	const handleFilterSelect = (filter: FilterType) => {
		setSelectedFilter(filter);
		setSettings({ ...presetFilters[filter] });
	};

	const handleSettingChange = (
		setting: keyof FilterSettings,
		value: number
	) => {
		setSettings((prev) => ({ ...prev, [setting]: value }));
	};

	const handleToggleCaptionInput = () => {
		setShowCaptionInput(!showCaptionInput);
		if (!showCaptionInput && caption) {
			setCaption("");
		}
	};

	const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCaption(e.target.value);
	};

	const handleDownload = () => {
		if (outputCanvasRef.current) {
			const filename = `vintage-${Date.now()}.jpg`;
			downloadImage(outputCanvasRef.current, filename);
			toast("Image downloaded successfully!");
		}
	};

	// Separate free and premium filters
	const freeFilters: FilterType[] = [
		"original",
		"sepia",
		"fade",
		"vintage",
		"monochrome",
		"warm",
		"vsco-polo",
	];
	const premiumFilters: FilterType[] = [
		"premium-kodak",
		"premium-fuji",
		"premium-bw",
		"premium-cinema",
		"premium-nostalgic",
	];

	return (
		<div className="w-full pt-14 select-none">
			<div className="grid md:grid-cols-3 gap-6 px-4 md:px-20 mx-auto">
				{/* Left panel - Filters */}
				<div
					className="md:col-span-1 bg-accent-100/10 rounded-lg ml-auto w-full md:w-[350px] md:min-h-[80vh] overflow-y-auto"
					style={{ maxHeight: "80vh" }}
				>
					<div
						onClick={() => {
							setShowFilters(!showFilters);
						}}
						className="sticky top-0 p-6	pb-0 backdrop-blur-md z-20 flex items-center justify-between cursor-pointer mb-4"
					>
						<h2 className="text-lg font-serif font-medium">
							Filters
						</h2>
						<ChevronDown
							className={`h-5 w-5 transition-all ${
								showFilters && "rotate-180"
							}`}
						/>
					</div>
					{showFilters && (
						<>
							<div className="grid px-4 grid-cols-3 gap-2">
								{freeFilters.map((filter) => (
									<FilterButton
										key={filter}
										name={
											filter.charAt(0).toUpperCase() +
											filter.slice(1)
										}
										isActive={selectedFilter === filter}
										onClick={() =>
											handleFilterSelect(filter)
										}
										previewStyle={generateFilterStyle(
											presetFilters[filter]
										)}
									/>
								))}
							</div>
							{/* Premium Filters */}
							<div className="m-6 mb-0">
								<div className="flex items-center gap-2 mb-3">
									<Crown className="h-5 w-5 text-vintage-faded" />
									<h3 className="text-md font-serif font-medium text-vintage-darkBrown">
										Premium Filters
									</h3>
								</div>
								<div className="grid grid-cols-3 gap-2">
									{premiumFilters.map((filter) => (
										<FilterButton
											key={filter}
											name={
												filter
													.replace("premium-", "")
													.charAt(0)
													.toUpperCase() +
												filter
													.replace("premium-", "")
													.slice(1)
											}
											isActive={selectedFilter === filter}
											onClick={() =>
												handleFilterSelect(filter)
											}
											previewStyle={generateFilterStyle(
												presetFilters[filter]
											)}
											isPremium={true}
										/>
									))}
								</div>
							</div>
						</>
					)}
					<div className="mt-6">
						<div
							onClick={() => {
								setShowAdjustment(!showAdjustment);
							}}
							className="sticky top-0 pt-0 p-6	pb-0 backdrop-blur-md z-20 flex items-center justify-between cursor-pointer mb-4"
						>
							<h2 className="text-lg font-serif font-medium text-vintage-darkBrown">
								Adjustments
							</h2>
							<ChevronDown
								className={`h-5 w-5 transition-all ${
									showAdjustment && "rotate-180"
								}`}
							/>
						</div>
						{showAdjustment && (
							<div className="space-y-4 px-6">
								<Slider
									label="Sepia"
									value={settings.sepia}
									onChange={(value) =>
										handleSettingChange("sepia", value)
									}
								/>
								<Slider
									label="Contrast"
									value={settings.contrast}
									onChange={(value) =>
										handleSettingChange("contrast", value)
									}
									min={50}
									max={150}
								/>
								<Slider
									label="Brightness"
									value={settings.brightness}
									onChange={(value) =>
										handleSettingChange("brightness", value)
									}
									min={50}
									max={150}
								/>
								<Slider
									label="Saturation"
									value={settings.saturation}
									onChange={(value) =>
										handleSettingChange("saturation", value)
									}
									min={0}
									max={150}
								/>
								<Slider
									label="Vignette"
									value={settings.vignette}
									onChange={(value) =>
										handleSettingChange("vignette", value)
									}
								/>
								<Slider
									label="Grain"
									value={settings.grain}
									onChange={(value) =>
										handleSettingChange("grain", value)
									}
									max={50}
								/>
							</div>
						)}
					</div>

					{/* Caption Section */}
					<div className="m-6 mb-4">
						<Button
							variant="hollow"
							onClick={handleToggleCaptionInput}
							className={`w-full flex items-center justify-center gap-2 mb-2 ${
								showCaptionInput
									? "bg-accent-200/20 text-white"
									: "bg-accent-200/20 hover:bg-accent-200/10"
							}`}
						>
							<Type className="h-5 w-5" />
							<span>
								{showCaptionInput
									? "Hide Caption"
									: "Add Caption"}
							</span>
						</Button>

						{showCaptionInput && (
							<>
								<div className="space-y-2">
									<label className="text-sm font-medium text-vintage-darkBrown">
										Enter caption text:
									</label>
									<Textarea
										value={caption}
										onChange={handleCaptionChange}
										placeholder="Type your caption here..."
										className="h-20 text-sm"
									/>
									<p className="text-xs text-vintage-faded italic">
										Caption will appear centered at the
										bottom of the image
									</p>
								</div>
								<div className="flex gap-2 py-2">
									{["#FFFFFF", "#000000"].map((color) => (
										<div
											key={color}
											className={`w-8 h-8 rounded-full border border-accent-200 cursor-pointer ${
												captionColor === color
													? "ring-2 ring-accent-200"
													: ""
											}`}
											style={{ backgroundColor: color }}
											onClick={(e) => {
												e.stopPropagation();
												setCaptionColor(color);
											}}
										></div>
									))}
								</div>
							</>
						)}
					</div>
				</div>

				{/* Right panel - Image preview */}
				<div className="md:col-span-2 z-[999] mx-auto">
					<div className="editor-container rounded-lg relative overflow-hidden ">
						{isProcessing && (
							<div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
								<Loader2 className="h-10 w-10 text-white animate-spin" />
							</div>
						)}
						{/* Hidden canvases for processing */}
						<canvas ref={inputCanvasRef} className="hidden" />

						{/* Visible output canvas */}
						<canvas
							ref={outputCanvasRef}
							className="w-full h-auto max-h-[60vh] object-contain"
						/>
					</div>
					<div className="mt-6 space-y-3 mb-4">
						<Button
							onClick={handleDownload}
							className="w-full flex items-center justify-center gap-2 "
						>
							<Download className="h-5 w-5" />
							<span>Download</span>
						</Button>

						<Button
							variant="hollow"
							onClick={onReset}
							className="w-full flex items-center justify-center gap-2 px-4 py-3 "
						>
							<Undo2 className="h-5 w-5" />
							<span>Upload New Photo</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoEditor;
