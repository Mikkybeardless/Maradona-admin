import { IconButton, Menu, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { RiCalendarEventLine } from "react-icons/ri";

interface DateSelectProps {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
}

export const DateSelect = ({ value, onChange }: DateSelectProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        onClose={handleClose} // ✅ Closes on outside click or ESC
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem disableRipple disableTouchRipple>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={value}
              onChange={(newValue) => {
                if (onChange) {
                  onChange(
                    newValue && dayjs.isDayjs(newValue)
                      ? newValue
                      : newValue
                      ? dayjs(newValue)
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
