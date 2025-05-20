import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
} from "@mui/material";

interface SelectInputProps {
  label: string;
  value: string | string[];
  onChange: (
    event: SelectChangeEvent<string | string[]>,
    child: React.ReactNode
  ) => void;
  options: { label: string; value: string }[];
  multiple?: boolean;
  fullWidth?: boolean;
}

const SelectInputCom: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  multiple = false,
  fullWidth = false,
}) => {
  const labelId = `${label}-label`;

  return (
    <FormControl fullWidth={fullWidth}>
      {/* Wrap label and select in a flex box */}
      <Box display="flex" alignItems="center" gap={2}>
        <InputLabel
          id={labelId}
          shrink // Keep label visible above select
          sx={{ minWidth: 80 }} // Adjust width for label
        >
          {label}
        </InputLabel>

        <Select<string | string[]>
          labelId={labelId}
          value={value}
          label={label}
          onChange={onChange}
          multiple={multiple}
          renderValue={
            multiple && Array.isArray(value)
              ? (selected) => (selected as string[]).join(", ")
              : undefined
          }
          displayEmpty
          size="small"
          sx={{
            fontSize: "0.875rem",
            borderRadius: "0.5rem",
            border: "1px solid",
            borderColor: "#ded9dd",
            backgroundColor: "inherit",
            outline: "none",
            height: "40px",
            paddingX: "10px",
            paddingY: "0",
            minWidth: 150, // Optional: make select wider or adjust as needed
            "& .MuiSelect-select": {
              padding: "8px 0",
              display: "flex",
              alignItems: "center",
            },
            "& fieldset": {
              border: "none",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 1,
                borderRadius: "0.5rem",
              },
            },
          }}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </FormControl>
  );
};

export default SelectInputCom;
