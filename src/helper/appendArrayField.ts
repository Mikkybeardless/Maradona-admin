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

export function appendField(
  formData: FormData,
  key: string,
  value: string | number | boolean | File | null | undefined
) {
  if (value === null || value === undefined) {
    throw new Error(`The field "${key}" cannot be null or undefined.`);
  }

  if (value instanceof File) {
    formData.append(key, value);
  } else {
    formData.append(key, String(value));
  }
}

export function appendObjectArrayField(formData: FormData, value: string[]) {
  value.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      formData.append(`data[${key}]`, String(value));
    });
  });
}
