import { z } from "zod";

export const reqLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const registrationSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z.string().max(10),
    hireDate: z.string().transform((value) => new Date(value)), // Transform string to Date
    passwordEmployee: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.passwordEmployee === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

// generic response schema
const responseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.optional(z.any()),
});

export type ReqLoginSchema = z.infer<typeof reqLoginSchema>;
export type RegistrationSchema = z.infer<typeof registrationSchema>;
export type ResponseSchema = z.infer<typeof responseSchema>;
