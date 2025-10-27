import { format } from "date-fns";
import Cookies from "js-cookie";
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

export const formatAmountToNaira = (
  amount: number,
  currency: string = "NGN"
): string => {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: currency,
  });
};

// Helper function to convert URL to File object for preview
export const urlToFile = async (
  url: string,
  filename: string
): Promise<File> => {
  // const sanitizedUrl = url.replace(/^.*?\.com/, "");
  // const response = await apiClient.get(sanitizedUrl, { responseType: "blob" });
  // const blob = response.data as Blob;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("admin_token") || ""}`,
    },
  });
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

// Helper function to convert URLs to Files for a specific field
export const convertUrlsToFiles = async (
  urls: string[],
  filePrefix: string
): Promise<File[]> => {
  if (!urls.length) return [];

  try {
    const filePromises = urls.map((url, index) =>
      urlToFile(url, `${filePrefix}-${index}`)
    );
    return await Promise.all(filePromises);
  } catch (error) {
    console.error(`Error converting ${filePrefix} URLs to files:`, error);
    return [];
  }
};

export const extractNumberFromString = (str: string): number | null => {
  const match = str.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[0]) : null;
};

export const formatMessageWithFormatedNaira = (message: string): string => {
  return message.replace(/(?<![^\s])\d+(\.\d+)?(?![^\s])/g, (numStr) => {
    const num = parseFloat(numStr);

    // Only format if number is 1000 or more
    if (!isNaN(num) && num >= 1000) {
      return formatAmountToNaira(num);
    }

    return numStr; // leave smaller numbers as they are
  });
};

export const getCurrentYearDateRange = (): {
  start_date: string;
  end_date: string;
} => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return {
    start_date: formatDate(startOfYear),
    end_date: formatDate(today),
  };
};

export function isISOString(str: string) {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/;
  return isoRegex.test(str);
}
