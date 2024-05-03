import {z} from 'zod';


export const SolicitudModelAdminSchema = z.object({
    nombre: z.string().min(1),
    correo_electronico: z.string().email(),
    contrasena: z.string().min(6),
});