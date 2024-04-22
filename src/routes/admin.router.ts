import { Router } from 'express';

import { createAdmin, forgotPassword, resetPassword, updatePassword, verifyEmail, login } from '../controllers/admin.controller';

import { checkAdminExists } from '../middlewares/adminExists.middleware';

const router = Router();

router.post('/verify-email', verifyEmail);

router.post('/admin', checkAdminExists, createAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/login', login);

router.put('/update-password', updatePassword);

export default router;