import { Router } from 'express';

import { createAdmin, forgotPassword, resetPassword, updatePassword, verifyEmail, login } from '../controllers/admin.controller';
//Validacion de createAdmin
import { SolicitudModelAdminSchema } from '../schemas/admin.schema';
import zodValidator  from '../middlewares/zodValidator.middleware';
//Validacion de fotgot-password
import { forgotPasswordSchema } from '../schemas/forgotPasswordSchema ';
//Validacion de reset-password
import { resetPasswordSchema } from '../schemas/resetPasswordSchema ';
//Validacion de update-password
import { updatePasswordSchema } from '../schemas/updatePasswordSchema ';
//Validacion de login
import { loginSchema } from '../schemas/loginSchema';
//idk
import { checkAdminExists } from '../middlewares/adminExists.middleware';

const router = Router();

router.post('/verify-email', verifyEmail);

router.post('/admin', checkAdminExists,zodValidator(SolicitudModelAdminSchema), createAdmin);
router.post('/forgot-password',zodValidator(forgotPasswordSchema), forgotPassword);
router.post('/reset-password',zodValidator(resetPasswordSchema), resetPassword);
router.post('/login',zodValidator(loginSchema), login);

router.put('/update-password',zodValidator(updatePasswordSchema), updatePassword);

export default router;