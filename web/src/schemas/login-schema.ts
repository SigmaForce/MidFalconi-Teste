import { z } from "zod";

export const loginSchema = z.object({
  id: z.uuid("ID inválido"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
