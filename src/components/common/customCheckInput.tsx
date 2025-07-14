import React from "react";

interface CustomCheckboxProps {
  id: string;
  label?: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export const CustomCheckbox = ({
  id,
  label,
  checked = false,
  onChange,
  disabled = false,
  className = "",
}: CustomCheckboxProps) => {
  return (
    <div className={`flex items-center gap-x-2 ${className}`}>
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`w-4 h-4 rounded-full border-2 border-gray-400 bg-gray-400 
                         flex items-center justify-center transition-all duration-200 ease-in-out
                         peer-checked:bg-orange-500 peer-checked:border-orange-500
                         ${
                           disabled
                             ? "cursor-not-allowed opacity-50"
                             : "cursor-pointer hover:scale-125"
                         }`}
        >
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </label>
      </div>
      {label && (
        <label
          htmlFor={id}
          className={`${
            disabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer text-sm"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
