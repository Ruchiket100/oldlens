import React from "react";
import { Slider as SliderPrimitive } from "@/components/ui/slider";

interface SliderProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
}

const Slider: React.FC<SliderProps> = ({
	label,
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
}) => {
	return (
		<div className="w-full">
			<div className="flex items-center justify-between mb-2">
				<label className="text-sm font-medium text-accent-100">
					{label}
				</label>
				<span className="text-xs text-vintage-faded">{value}%</span>
			</div>
			<SliderPrimitive
				value={[value]}
				min={min}
				max={max}
				step={step}
				onValueChange={(vals) => onChange(vals[0])}
				className="w-full"
			/>
		</div>
	);
};

export default Slider;
