import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "O nome deve ter pelo menos 1 caracteres"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
