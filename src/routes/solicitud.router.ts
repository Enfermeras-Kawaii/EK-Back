import { Router } from 'express';

import { createSolicitudEmpleo, deleteSolicitudEmpleo, getSolicitudEmpleo, getSolicitudesEmpleo, updateSolicitudEmpleo } from '../controllers/solicitud1.controller';

import { validateAdmin } from '../middlewares/verifyAdmin.middleware';

const router = Router();

router.post('/solicitud', validateAdmin, createSolicitudEmpleo);

router.post('/solicitudGet', validateAdmin, getSolicitudesEmpleo);
router.get('/solicitud/:id', validateAdmin, getSolicitudEmpleo);

router.put('/solicitud/:id', validateAdmin, updateSolicitudEmpleo);

router.delete('/solicitud/:id', validateAdmin, deleteSolicitudEmpleo);

export default router;