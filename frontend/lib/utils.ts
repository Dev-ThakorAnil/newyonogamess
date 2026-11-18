import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert a local datetime-local string to a UTC ISO string.
 * Handles empty/falsy inputs by returning null.
 */
export function toUtcIsoString(localDatetimeStr: string | null | undefined): string | null {
  if (!localDatetimeStr) return null;
  try {
    const d = new Date(localDatetimeStr);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  } catch {
    return null;
  }
}

/**
 * Convert a UTC ISO date string to local datetime-local format for input fields.
 */
export function toLocalDatetimeString(isoStr: string | null | undefined): string {
  if (!isoStr) return "";
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return "";
  }
}