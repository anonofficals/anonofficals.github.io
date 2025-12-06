
import { z } from "zod";

export const searchSchema = z.object({
  query: z.string()
    .min(1, "Search query cannot be empty")
    .min(3, "Search query must be at least 3 characters")
    .max(100, "Search query is too long")
    .refine((value) => {
      // Check if it's a valid email format or application ID format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const idRegex = /^INT-\d{4}-\d{3}$/i;
      const isEmail = emailRegex.test(value);
      const isId = idRegex.test(value);
      const isPartialMatch = value.length >= 3;
      
      return isEmail || isId || isPartialMatch;
    }, "Invalid format. Use email, application ID (INT-YYYY-XXX), or name")
});

export const validateSearch = (query: string) => {
  try {
    searchSchema.parse({ query });
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: "Invalid input" };
  }
};
