import { z } from "zod";

const UserSchema = z.object({
  name: z.string().max(50),
  age: z.number().positive().int(),
  occupation: z.string(),
  image: z.string(),
});
export type UserType = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema;
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = UserSchema;
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
