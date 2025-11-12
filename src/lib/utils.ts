import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUniqueId = () => {
  // Generate a 10-digit number for the ID (1000000000-9999999999 range)
  // Uses timestamp + random for better uniqueness across calls
  const timestamp = Date.now().toString(); // e.g., "1731280000000" (13 digits)
  const randomPart = Math.random().toString().slice(2, 11); // ~9 random digits
  // Fix: Use Number.parseInt for better TypeScript/SonarQube compliance
  const timestampNum = BigInt(Number.parseInt(timestamp.slice(-10)));
  const combined = (timestampNum * BigInt(1000000000) + BigInt(randomPart))
    .toString()
    .slice(-10);
  // Pad with leading zeros if needed (rare, but ensures exactly 10 digits)
  return `P-${combined.padStart(10, "0")}`;
};
