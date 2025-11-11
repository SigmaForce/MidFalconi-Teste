import { z } from "zod";

export const userSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  sobrenome: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
  email: z.email("Informe um e-mail válido"),
  perfil: z.string().min(1, "Selecione um perfil"),
});

export type UserFormValues = z.infer<typeof userSchema>;
