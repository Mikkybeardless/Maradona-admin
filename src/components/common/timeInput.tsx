import { TextField } from "@mui/material";

interface TimeInputProps {
  value: Date | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TimeInput({ value, onChange }: TimeInputProps) {
  return (
    <TextField
      label="Select Time"
      type="time"
      value={value ? value.toISOString().substring(11, 16) : "17:00"}
      // defaultValue="12:30"
      InputLabelProps={{
        shrink: true, // makes sure the label doesn’t overlap
      }}
      inputProps={{
        step: 300, // 5 min steps
      }}
      onChange={onChange}
      fullWidth
    />
  );
}
