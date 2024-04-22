import { Request, Response, NextFunction } from 'express';

import UsuarioModel from '../models/usuario.model';

export const verifyEmailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { id_usuario } = req.body;

    if (!id_usuario) {
        return res.status(400).json({ message: 'ID de usuario es requerido' });
    }

    try {
        const usuario = await UsuarioModel.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!usuario.emailVerificated) {
            return res.status(403).json({ message: 'El correo electrónico aún no está verificado.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar el correo electrónico' });
    }
    return;
};