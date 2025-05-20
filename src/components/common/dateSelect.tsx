import { IconButton, Menu, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { RiCalendarEventLine } from "react-icons/ri";

interface DateSlectProps {
  value: Date | null;
  onChange?: (date: Date | null) => void;
}
export const DateSelect = ({ value, onChange }: DateSlectProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="flex cursor-pointer bg-white rounded-lg border border-primaryBorder px-2 items-center"
      >
        <span>Date</span>
        <IconButton
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <RiCalendarEventLine size={24} color="#5C4D58" />
        </IconButton>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClick}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClick}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
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
            />
          </LocalizationProvider>
        </MenuItem>
      </Menu>
    </>
  );
};
