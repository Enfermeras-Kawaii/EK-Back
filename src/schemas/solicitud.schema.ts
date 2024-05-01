import { z } from 'zod';


export const SolicitudModelTabletSchema = z.object({
    id_solicitud: z.number().int().positive().min(1),
    nombre: z.string().min(1),
    apellido_materno: z.string().min(1),
    apellido_paterno: z.string().min(1),
    domicilio: z.string().min(1),
    puesto: z.string().min(1),
    genero: z.string().min(1),
    fecha_nacimiento: z.date(),
    rfc: z.string().min(1),
    correo_electronico: z.string().email(),
    salario_hora: z.number().positive(),
    experiencias_previas: z.string().min(1),
    detalles_ultimo_trabajo: z.string().min(1),
    ine: z.string().min(1),
    curp: z.string().min(1),
    acta_nacimiento: z.string().min(1),
    referencias_personales: z.string().min(1),
    titulo_tecnico: z.string().min(1),
    titulo_profesional: z.string().min(1),
});