import dayjs from "dayjs";

const formatDayJs = (date: dayjs.Dayjs | null): string => {
  if (!date) return "";
  const formatted = dayjs(date).toISOString();
  return formatted;
};
export default formatDayJs;
