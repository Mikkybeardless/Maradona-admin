import React from "react";
import { useDateRange } from "../../hooks/DateRangeContex";

const DateRangeSelector: React.FC = () => {
  const { range, setRange } = useDateRange();

  const onChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange({ ...range, startDate: e.target.value });
  };

  const onChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange({ ...range, endDate: e.target.value });
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs">From</label>
      <input
        type="date"
        value={range.startDate}
        onChange={onChangeStart}
        className="p-2 rounded border"
      />
      <label className="text-xs">To</label>
      <input
        type="date"
        value={range.endDate}
        onChange={onChangeEnd}
        className="p-2 rounded border"
      />
    </div>
  );
};

export default DateRangeSelector;
