import { z } from 'zod';

export const loginSchema = z.object({
  correo_electronico: z.string().email(),
  contrasena: z.string(),
});
