import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
  email: z.email("Informe um e-mail válido"),
  profileId: z.uuid().min(1, "Selecione um perfil"),
});

export type UserFormValues = z.infer<typeof userSchema>;
