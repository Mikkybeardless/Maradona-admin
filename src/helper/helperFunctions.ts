import { format } from "date-fns";

export function generateRandomNumber(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function formatPrice(price: number) {
  const internationalNumberFormat = new Intl.NumberFormat("en-US");
  return internationalNumberFormat.format(price);
}

export const reFormatDate = (date: Date | null) => {
  if (date) {
    return format(date, "MMM d yyyy");
  }
  return "";
};
