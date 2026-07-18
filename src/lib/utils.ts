import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely.
 * clsx handles conditional/array/object inputs; tailwind-merge resolves
 * conflicting utilities (e.g. `px-2 px-4` -> `px-4`) so later wins.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
