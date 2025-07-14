import { useState } from "react";

export const DistanceRange = ({
  wholeColor = "#e5e7eb",
  height = "5px",
  rounded = "1px",
  onValueChange,
}: {
  wholeColor?: string;
  height?: string;
  rounded?: string;
  onValueChange?: (value: number, percentage: number, color: string) => void;
}) => {
  const [value, setValue] = useState(0);

  // Calculate percentage (0-100)
  const percentage = (value / 5) * 100;

  // Calculate color based on percentage
  const calculateRangeColor = (percent: number): string => {
    if (percent === 0) return "#e5e7eb"; // Gray for 0
    if (percent <= 20) return "#10b981"; // Green (0-20%)
    if (percent <= 40) return "#3b82f6"; // Blue (20-40%)
    if (percent <= 60) return "#f59e0b"; // Orange (40-60%)
    if (percent <= 80) return "#ef4444"; // Red (60-80%)
    return "#dc2626"; // Dark red (80-100%)
  };

  const rangeColor = calculateRangeColor(percentage);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    const newPercentage = (newValue / 5) * 100;
    const newColor = calculateRangeColor(newPercentage);
    onValueChange?.(newValue, newPercentage, newColor);
  };

  return (
    <div className="space-y-2">
      {/* Current value display */}
      <div className="flex justify-end">
        <span className="text-xs text-orange-500 font-bold">
          {value.toFixed(1)}m Km
        </span>
      </div>

      {/* Visual progress bar */}
      <div
        className="relative w-full rounded-[5px] overflow-hidden"
        style={{
          backgroundColor: wholeColor,
          height: height,
        }}
      >
        <div
          className="absolute top-0 left-0 transition-all duration-200 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: rangeColor,
            height: height,
            borderRadius: rounded,
            borderRightColor: rangeColor,
            borderRightWidth: percentage > 0 ? "3px" : "0px",
          }}
        />
      </div>

      {/* Range input slider */}
      <div className="relative">
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={value}
          onChange={(e) => handleValueChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-transparent appearance-none cursor-pointer slider"
          style={{
            background: "transparent",
          }}
        />
        <style>{`
          .slider::-webkit-slider-track {
            height: 2px;
            background: transparent;
            border-radius: 1px;
          }
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: ${rangeColor};
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .slider::-moz-range-track {
            height: 2px;
            background: transparent;
            border-radius: 1px;
            border: none;
          }
          .slider::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: ${rangeColor};
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">0</span>
        <span className="text-sm text-gray-600">5m km</span>
      </div>
    </div>
  );
};

// Demo component to show usage
const Demo = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [currentColor, setCurrentColor] = useState("#e5e7eb");

  return (
    <div className="p-6 max-w-md mx-auto">
      <DistanceRange
        onValueChange={(value, percentage, color) => {
          setCurrentValue(value);
          setCurrentPercentage(percentage);
          setCurrentColor(color);
        }}
      />

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium mb-2">Callback Data:</h3>
        <div className="text-sm space-y-1">
          <div>Value: {currentValue.toFixed(1)}m Km</div>
          <div>Percentage: {currentPercentage.toFixed(1)}%</div>
          <div>
            Color: <span style={{ color: currentColor }}>{currentColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
