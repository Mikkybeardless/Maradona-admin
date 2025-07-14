import { HiSortDescending } from "react-icons/hi";

export const StatusSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className=" px-2 md:px-2.5 relative flex items-center gap-x-[2px] md:gap-x-1 rounded-lg border border-primaryBorder bg-white">
        <HiSortDescending />
        <select
          id="selectSort"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm outline-none h-full py-2.5"
        >
          <option value="">status</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
