import { z } from 'zod';


export const updatePasswordSchema = z.object({
  id_usuario: z.string(),
  currentPassword: z.string(),
  newPassword: z.string().min(6),
});
