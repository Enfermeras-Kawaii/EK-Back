import { Router } from 'express';
import validator from '../middlewares/zodValidator.middleware';
import { createSolicitudEmpleoTablet } from '../controllers/solicitudTablet.controller';
import { SolicitudModelTabletSchema } from '../schemas/solicitud.schema';

const router = Router();
router.post('/solicitudTablet',validator(SolicitudModelTabletSchema), createSolicitudEmpleoTablet)
export default router;