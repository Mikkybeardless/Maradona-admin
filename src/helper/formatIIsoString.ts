export const formatIsoString = (
  isoString: string
): { formattedDate: string; formattedTime: string } => {
  const date = new Date(isoString);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  // Format the date and time
  let formattedDate = date.toLocaleDateString("en-GB");
  // Format time with AM/PM
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Ensures AM/PM format
  });
  formattedDate = `${dayName}, ${formattedDate}`;

  return { formattedDate, formattedTime };
};
