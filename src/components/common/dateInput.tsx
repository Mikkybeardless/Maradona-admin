import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PiCalendarDotsLight } from "react-icons/pi";

interface CustomDateInputProps {
  label?: string;
  onChange?: (date: Date | null) => void;
  value: Date | null;
  iconColor?: string;
}

export default function CustomDateInput({
  label,
  onChange,
  value,
  iconColor,
}: CustomDateInputProps) {
  return (
    <>
      {label && <label className="font-medium">{label}</label>}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          onChange={(value) => {
            if (onChange) {
              onChange(
                value instanceof Date
                  ? value
                  : value
                  ? new Date(value as any)
                  : null
              );
            }
          }}
          slots={{
            openPickerIcon: () => (
              <PiCalendarDotsLight className={`${iconColor} h-7 w-7 mr-1`} />
            ),
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              placeholder: "Select date",
              sx: {
                "& .MuiInputBase-root": {
                  height: "30px",
                  padding: "0px",
                },
                "& .MuiInputBase-input": {
                  padding: "10px 12px",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
              className: "rounded-lg border border-[#B0B0B0] bg-white",
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
}
