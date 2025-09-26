import React, { createContext, useContext, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

type DateRange = {
  startDate: string; // yyyy-mm-dd
  endDate: string; // yyyy-mm-dd
};

type DateRangeContextValue = {
  range: DateRange;
  debouncedRange: DateRange;
  setRange: (r: DateRange) => void;
};

const defaultRange: DateRange = {
  startDate: new Date(new Date().getFullYear(), 0, 1)
    .toISOString()
    .slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
};

const DateRangeContext = createContext<DateRangeContextValue | undefined>(
  undefined
);

export const DateRangeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [range, setRange] = useState<DateRange>(defaultRange);

  // Debounce the range so consumers only react after user finished changing dates
  const debouncedRange = useDebounce<DateRange>(range, 2000);

  const value = useMemo(
    () => ({ range, debouncedRange, setRange }),
    [range, debouncedRange]
  );

  return (
    <DateRangeContext.Provider value={value}>
      {children}
    </DateRangeContext.Provider>
  );
};

export function useDateRange() {
  const ctx = useContext(DateRangeContext);
  if (!ctx)
    throw new Error("useDateRange must be used within DateRangeProvider");
  return ctx;
}

export default DateRangeContext;
