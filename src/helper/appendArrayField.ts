export function appendArrayField(
  formData: FormData,
  key: string,
  value: unknown[],
  isFileArray = false
) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`The field "${key}" cannot be empty.`);
  }

  value.forEach((item) => {
    if (isFileArray) {
      if (item instanceof File) {
        formData.append(`${key}[]`, item);
      }
    } else {
      formData.append(`${key}[]`, String(item));
    }
  });
}
