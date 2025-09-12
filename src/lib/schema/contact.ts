//! File: src/lib/schema/contact.ts

import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(200, "Subject too long"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
