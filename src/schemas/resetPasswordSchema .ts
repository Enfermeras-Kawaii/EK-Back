import { z } from 'zod';


export const resetPasswordSchema = z.object({
  codigo: z.string(),
  newPassword: z.string().min(6), 
});
