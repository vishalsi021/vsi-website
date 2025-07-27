export type ClassValue = string | number | boolean | undefined | null | ClassArray | ClassDictionary;

export interface ClassDictionary {
  [id: string]: any;
}

export interface ClassArray extends Array<ClassValue> {}

// Simple clsx implementation
function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = clsx(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) classes.push(key);
      }
    }
  }
  
  return classes.join(' ');
}

// Fallback for tailwind-merge if not available
let twMerge: ((...inputs: ClassValue[]) => string) | undefined;

try {
  const { twMerge: importedTwMerge } = require("tailwind-merge");
  twMerge = importedTwMerge;
} catch (error) {
  // Fallback if tailwind-merge is not available
  twMerge = (...inputs: ClassValue[]) => clsx(...inputs);
}

export function cn(...inputs: ClassValue[]) {
  if (twMerge) {
    return twMerge(clsx(...inputs));
  }
  return clsx(...inputs);
}

// Alternative simple implementation without tailwind-merge
export function cnSimple(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}