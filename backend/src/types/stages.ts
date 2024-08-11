import { z } from "zod";

// Define the Zod schema for the stage object
export const stageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  header_color: z.string(),
  description: z.string(),
  pipeline: z.string().uuid(),
  order: z.number(),
  created_at: z.string().datetime(),
});

// Define the Zod schema for the stages response
export const stagesResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  page_size: z.number(),
  results: z.array(stageSchema),
});

// Define the TypeScript types based on the Zod schemas
export type Stage = z.infer<typeof stageSchema>;
export type StagesResponse = z.infer<typeof stagesResponseSchema>;
