import React, { useCallback, useState } from "react";

interface PriceInputProps {
  onChange?: (value: string) => void;
  id: string;
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  inputClassName?: string;
}

export default function PriceInput({
  id,
  label,
  name,
  onChange = () => {},
  placeholder = "Enter price",
  value,
  inputClassName = "w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent",
}: PriceInputProps) {
  const [price, setPrice] = useState(value || "");

  const formatPrice = useCallback((value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";

    return "N" + numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  const getRawValue = (price: string) => {
    return price.replace(/\D/g, "");
  };

  const maintainCursorPosition = useCallback(
    (input: HTMLInputElement, beforeLength: number, afterValue: string) => {
      const start = input.selectionStart;
      const afterLength = afterValue.length;
      const diff = afterLength - beforeLength;

      requestAnimationFrame(() => {
        if (start !== null) {
          input.setSelectionRange(start + diff, start + diff);
        }
      });
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const rawData = getRawValue(input.value);
      const beforeLength = input.value.length;
      const formatted = formatPrice(input.value);
      setPrice(formatted);
      onChange(rawData);
      maintainCursorPosition(input, beforeLength, formatted);
    },
    [formatPrice, maintainCursorPosition]
  );

  return (
    <div className="flex flex-col gap-y-1.5 flex-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm mb-2 font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type="text"
        value={price}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
}
