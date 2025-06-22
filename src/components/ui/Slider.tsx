import React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  leftLabel,
  rightLabel,
  className
}) => {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {leftLabel && (
        <span className="text-gray-500 text-sm mr-2 whitespace-nowrap">
          {leftLabel}
        </span>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 mx-2 accent-indigo-300 cursor-pointer"
      />
      {rightLabel && (
        <span className="text-gray-500 text-sm ml-2 whitespace-nowrap">
          {rightLabel}
        </span>
      )}
    </div>
  );
}; 