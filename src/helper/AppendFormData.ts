import { appendArrayField, appendObjectArrayField } from "./appendArrayField";

export function appendUpdateDataField(
  formData: FormData,
  key: string,
  value: unknown,
  isAuction = false
): boolean {
  // Global empty check → skip if empty
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return true; // do nothing for empty fields
  }

  // Special handling: documents & media
  if (key === "documents" || key === "media") {
    if (typeof value === "string") {
      return true; // skip single URL
    }

    if (Array.isArray(value)) {
      // skip if all entries are strings or null (URLs or placeholders)
      if (value.every((v) => typeof v === "string" || v === null)) {
        return true;
      }
      appendArrayField(formData, key, value as File[], true);
      return true;
    }
  }

  // Special handling: tags
  if (key === "tags") {
    appendArrayField(formData, key, value as number[], false);
    return true;
  }

  if (isAuction && key === "data") {
    appendObjectArrayField(formData, value as string[]);
  }

  // Default: append value
  if (Array.isArray(value) || typeof value === "object") {
    formData.append(key, JSON.stringify(value));
  } else {
    formData.append(key, value as string | Blob);
  }

  return true;
}
