import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ALLOWED_FILE_TYPES } from "~/config/image";

export function validateFileType(file: File) {
  return ALLOWED_FILE_TYPES.includes(file.type)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}