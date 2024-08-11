import { z } from "zod";

// Define the Zod schema for the contact object
export const contactSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  nationality_code: z.string(),
  country_code: z.string().nullable(),
  phone_number: z.string().nullable(),
  status: z.enum(["o", "c", "l", "h"]),
  lost_reason: z.string().nullable(),
  lost_reason_comments: z.string().nullable(),
  held_by: z.string().uuid().nullable(),
  hold_expired_at: z.string().datetime().nullable(),
  stage: z.string().uuid(),
  assigned_to: z.string().uuid().nullable(),
  source: z.string().nullable(),
  created_at: z.string().datetime(),
});

// Define the Zod schema for the contacts response
export const contactsResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  page_size: z.number(),
  results: z.array(contactSchema),
});

// Define the TypeScript types based on the Zod schemas
export type Contact = z.infer<typeof contactSchema>;
export type ContactResponse = z.infer<typeof contactsResponseSchema>;
