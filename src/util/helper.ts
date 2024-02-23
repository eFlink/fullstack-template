import { ALLOWED_FILE_TYPES } from "~/config/image";

export function validateFileType(file: File) {
  return ALLOWED_FILE_TYPES.includes(file.type)
}