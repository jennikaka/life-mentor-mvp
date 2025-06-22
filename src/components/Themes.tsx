"use client";
import React from "react";

interface ThemesProps {
  counts: Record<string, number>;
  scores: Record<string, number>;  // 0–100 sentiment score per theme
}

export const Themes: React.FC<ThemesProps> = ({ counts, scores }) => {
  if (Object.keys(counts).length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No themes yet</p>
        <p className="text-sm mt-1">Your themes will appear here as you reflect</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(counts).map(([theme, count]) => {
        const score = scores[theme] || 50;
        const sizeClass =
          count >= 3 ? "w-40 h-40" : count === 2 ? "w-32 h-32" : "w-24 h-24";
        
        // Create red-to-green spectrum with half-transparent soft colors
        let baseColor;
        if (score <= 50) {
          // Red spectrum for negative sentiment (0-50)
          const intensity = Math.max(0.3, 1 - (score / 50));
          baseColor = `rgba(239, 68, 68, ${intensity})`; // Soft red
        } else {
          // Green spectrum for positive sentiment (51-100)
          const intensity = Math.max(0.3, (score - 50) / 50);
          baseColor = `rgba(34, 197, 94, ${intensity})`; // Soft green
        }
        
        // Gradient from the base color to white inside the block
        const color = `linear-gradient(
          to bottom right, 
          ${baseColor},
          rgba(255, 255, 255, 0.9)
        )`;
        
        return (
          <div
            key={theme}
            style={{ background: color }}
            className={`${sizeClass} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 animate-[float_6s_ease-in-out_infinite] flex items-center justify-center text-center px-2 cursor-pointer`}
            title={`${theme}: ${score}/100 sentiment`}
          >
            <span className="text-gray-800 font-medium text-sm">{theme}</span>
          </div>
        );
      })}
    </div>
  );
};
