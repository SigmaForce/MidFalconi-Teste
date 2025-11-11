import { z } from "zod";

export const profileSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
