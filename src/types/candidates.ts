import { z } from "zod";

export const CandidateSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener minimo 3 caracteres")
    .max(100, "El nombre es muy largo"),
  age: z.number().positive(),
  experience: z.number().gte(0),
  status: z.enum(["Pending", "Reviewing", "Hired", "Rejected", "Interviewing"]),
  skills: z.array(z.string()),
  working: z.boolean(),
});

export type CandidateType = z.infer<typeof CandidateSchema>;
