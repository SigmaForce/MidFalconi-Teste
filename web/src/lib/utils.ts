import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(username: string) {
  const parts = username.trim().split(/\s+/);
  const initials =
    (parts[0]?.[0] || "") +
    (parts.length > 1 ? parts[parts.length - 1][0] : "");

  return initials.toUpperCase();
}
