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

export const buildCleanParams = (
  filters: Record<string, string | string[]>,
  query?: string,
  page?: number,
  per_page?: number
): URLSearchParams => {
  const params = new URLSearchParams();

  // Add search query if it exists
  if (query && query.trim() !== "") {
    params.set("search", query);
  }
  if (page && per_page) {
    params.set("page", page.toString());
    params.set("per_page", per_page.toString());
  }

  // Add filters with proper cleaning
  Object.entries(filters).forEach(([key, value]) => {
    // Skip if value is falsy or empty
    if (!value || value === "" || value === "all" || value === "any") {
      return;
    }

    // Handle arrays (for multi-select filters)
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(","));
      }
      return;
    }

    // Handle objects (for complex filters like price ranges)
    if (typeof value === "object") {
      // Skip if all properties are empty
      const hasValue = Object.values(value).some(
        (v) => v !== "" && v !== null && v !== undefined
      );
      if (hasValue) {
        params.set(key, JSON.stringify(value));
      }
      return;
    }

    // Handle primitive values
    params.set(key, String(value));
  });

  return params;
};
