import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  correo_electronico: z.string().email(),
});
