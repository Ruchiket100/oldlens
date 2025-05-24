export interface FilterSettings {
	sepia: number;
	contrast: number;
	brightness: number;
	saturation: number;
	vignette: number;
	grain: number;
	blur: number;
}

export type FilterType =
	| "original"
	| "sepia"
	| "fade"
	| "vintage"
	| "monochrome"
	| "warm"
	| "vsco-polo"
	| "premium-kodak"
	| "premium-fuji"
	| "premium-bw"
	| "premium-cinema"
	| "premium-nostalgic";

export const defaultFilterSettings: FilterSettings = {
	sepia: 0,
	contrast: 100,
	brightness: 100,
	saturation: 100,
	vignette: 0,
	grain: 0,
	blur: 0,
};
export const presetFilters: Record<FilterType, FilterSettings> = {
	original: defaultFilterSettings,
	sepia: {
		sepia: 70,
		contrast: 110,
		brightness: 90,
		saturation: 90,
		vignette: 30,
		grain: 15,
		blur: 0,
	},
	fade: {
		sepia: 20,
		contrast: 90,
		brightness: 110,
		saturation: 70,
		vignette: 10,
		grain: 20,
		blur: 0,
	},
	vintage: {
		sepia: 50,
		contrast: 120,
		brightness: 95,
		saturation: 85,
		vignette: 40,
		grain: 30,
		blur: 0,
	},
	monochrome: {
		sepia: 0,
		contrast: 130,
		brightness: 95,
		saturation: 0,
		vignette: 50,
		grain: 25,
		blur: 0,
	},
	warm: {
		sepia: 30,
		contrast: 105,
		brightness: 105,
		saturation: 110,
		vignette: 20,
		grain: 15,
		blur: 0,
	},
	"vsco-polo": {
		sepia: 15,
		contrast: 95,
		brightness: 100,
		saturation: 80,
		vignette: 25,
		grain: 20,
		blur: 1,
	},
	// Premium Filters - VSCO Inspired
	"premium-kodak": {
		sepia: 15,
		contrast: 115,
		brightness: 102,
		saturation: 120,
		vignette: 15,
		grain: 25,
		blur: 0,
	},
	"premium-fuji": {
		sepia: 10,
		contrast: 110,
		brightness: 105,
		saturation: 95,
		vignette: 35,
		grain: 20,
		blur: 0,
	},
	"premium-bw": {
		sepia: 5,
		contrast: 140,
		brightness: 95,
		saturation: 0,
		vignette: 60,
		grain: 40,
		blur: 0,
	},
	"premium-cinema": {
		sepia: 25,
		contrast: 125,
		brightness: 90,
		saturation: 115,
		vignette: 50,
		grain: 30,
		blur: 1,
	},
	"premium-nostalgic": {
		sepia: 35,
		contrast: 85,
		brightness: 110,
		saturation: 75,
		vignette: 40,
		grain: 45,
		blur: 1,
	},
};

export const generateFilterStyle = (
	settings: FilterSettings
): React.CSSProperties => {
	return {
		filter: `
		sepia(${settings?.sepia / 100})
		contrast(${settings.contrast / 100})
		brightness(${settings.brightness / 100})
		saturate(${settings.saturation / 100})
		blur(${settings.blur / 10}px)
	  `,
	};
};

export const applyVignette = (
	canvas: HTMLCanvasElement,
	intensity: number
): void => {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	const gradient = ctx.createRadialGradient(
		canvas.width / 2,
		canvas.height / 2,
		0,
		canvas.width / 2,
		canvas.height / 2,
		Math.sqrt(
			Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2)
		)
	);

	gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
	gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
	gradient.addColorStop(1, `rgba(0, 0, 0, ${(intensity / 100) * 0.8})`);

	ctx.fillStyle = gradient;
	ctx.globalCompositeOperation = "multiply";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "source-over";
};

export const applyGrain = (
	canvas: HTMLCanvasElement,
	intensity: number
): void => {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const noise = (Math.random() - 0.5) * intensity;
		data[i] += noise;
		data[i + 1] += noise;
		data[i + 2] += noise;
	}

	ctx.putImageData(imageData, 0, 0);
};

export const processImage = (
	inputCanvas: HTMLCanvasElement,
	outputCanvas: HTMLCanvasElement,
	settings: FilterSettings
): void => {
	const ctx = outputCanvas.getContext("2d");
	if (!ctx) return;

	// Match output canvas size to input canvas
	outputCanvas.width = inputCanvas.width;
	outputCanvas.height = inputCanvas.height;

	// Draw the input image with filters
	ctx.filter = `
      sepia(${settings.sepia / 100})
      contrast(${settings.contrast / 100})
      brightness(${settings.brightness / 100})
      saturate(${settings.saturation / 100})
      blur(${settings.blur / 10}px)
    `;
	ctx.drawImage(inputCanvas, 0, 0);
	ctx.filter = "none";

	// Apply vignette and grain effects
	applyVignette(outputCanvas, settings.vignette);
	applyGrain(outputCanvas, settings.grain);
};

export const downloadImage = (
	canvas: HTMLCanvasElement,
	filename: string
): void => {
	const link = document.createElement("a");
	link.download = filename;
	link.href = canvas.toDataURL("image/jpeg");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const loadImage = (file: File): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = URL.createObjectURL(file);
	});
};
