import React, { useState } from "react";

export const NumberInput = ({
  min = 0,
  max = 5,
  step = 0.1,
  defaultValue = 0,
  onValueChange,
}: {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}) => {
  const [value, setValue] = useState(defaultValue);
  const [displayValue, setDisplayValue] = useState(
    defaultValue.toLocaleString()
  );

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const parseFormattedNumber = (formattedStr: string): number => {
    return parseFloat(formattedStr.replace(/,/g, "")) || 0;
  };

  const handleValueChange = (newValue: number) => {
    const clampedValue = Math.min(max, Math.max(min, newValue));
    setValue(clampedValue);
    setDisplayValue(formatNumber(clampedValue));
    onValueChange?.(clampedValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow user to type and see their input
    setDisplayValue(inputValue);

    // Parse the number for validation
    const numericValue = parseFormattedNumber(inputValue);

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(max, Math.max(min, numericValue));
      setValue(clampedValue);
      onValueChange?.(clampedValue);
    }
  };

  const handleInputBlur = () => {
    // Format the number when user leaves the input field
    setDisplayValue(formatNumber(value));
  };

  const handleDecrement = () => {
    handleValueChange(value - step);
  };

  const handleIncrement = () => {
    handleValueChange(value + step);
  };

  return (
    <div className="flex gap-2 border w-fit px-2 rounded-lg bg-inherit border-[#B5ABB3] items-center">
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-5 h-5 rounded-full flex items-center justify-center border border-black  disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold text-lg  transition-colors"
      >
        −
      </button>

      <div className="relative flex items-center">
        <span className="absolute left-2 text-black font-medium">₦</span>
        <input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-32 h-14 pl-4 pr-2 text-center bg-inherit  focus:outline-none focus:ring-2 focus:ring-defaultOrange focus:border-transparent"
        />
      </div>

      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="w-5 h-5 rounded-full flex items-center justify-center border border-black  disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold text-lg  transition-colors"
      >
        +
      </button>
    </div>
  );
};

// Demo component
const Demo = () => {
  const [currentValue, setCurrentValue] = useState(0);

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <h2 className="text-lg font-semibold">Number Input Component</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Amount (₦0-₦5000):
          </label>
          <NumberInput
            min={0}
            max={5000}
            step={10}
            defaultValue={0}
            onValueChange={setCurrentValue}
          />
        </div>

        <div className="p-3 bg-gray-50 rounded">
          <p className="text-sm">
            Current amount: <strong>₦{currentValue.toLocaleString()}</strong>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">More Examples:</h3>

        <div>
          <label className="block text-sm font-medium mb-2">
            Price (₦100-₦1000):
          </label>
          <NumberInput min={100} max={1000} step={50} defaultValue={500} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Budget (₦0-₦10000):
          </label>
          <NumberInput min={0} max={10000} step={100} defaultValue={2000} />
        </div>
      </div>
    </div>
  );
};

export default Demo;
