function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// // Example:
// const dateObj = new Date("Fri Aug 15 2025 00:00:00 GMT+0100");
// const formattedDate = formatDateToYYYYMMDD(dateObj);
// console.log(formattedDate); // "2025-08-15"
export default formatDateToYYYYMMDD;
