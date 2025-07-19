import { z } from "zod";

export const categoryOptions = [
  "Trabajo",
  "Vivienda",
  "Alimentación",
  "Servicios",
  "Transporte",
  "Educación",
  "Ocio",
  "Salud",
  "Ventas",
  "Otro",
] as const;

const EventSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  description: z.string().max(100),
  amount: z.number().positive().min(0),
  date: z.date(),
  type: z.enum(["Egreso", "Ingreso"]),
  category: z.enum(categoryOptions),
  image: z.string().optional(),
});

export type EventType = z.infer<typeof EventSchema>;

export const CreateEventSchema = EventSchema.omit({
  id: true,
});
export type CreateEventSchema = z.infer<typeof CreateEventSchema>;

export const UpdateEventSchema = EventSchema.partial().extend({
  id: z.string(),
});
export type UpdateEventSchema = z.infer<typeof UpdateEventSchema>;
export type EventFormInput = Omit<EventType, "id">;
