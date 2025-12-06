import { useState } from 'react';
import { z } from 'zod';

export const useFormValidation = <T extends z.ZodType>(schema: T) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: unknown): data is z.infer<T> => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const clearErrors = () => setErrors({});

  return { errors, validate, clearErrors };
};

// Common validation schemas
export const emailSchema = z.string().email("Invalid email address").min(1, "Email is required");
export const nameSchema = z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long");
export const phoneSchema = z.string().regex(/^\+?[\d\s-()]+$/, "Invalid phone number").optional();
export const urlSchema = z.string().url("Invalid URL").optional().or(z.literal(""));
