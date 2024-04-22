import { Request, Response, NextFunction } from 'express';

import UsuarioModel from '../models/usuario.model';

export const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const id_usuario = req.body.id_usuario;

    if (!id_usuario || !id_usuario.startsWith('adm1-')) {
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    try {
        const usuario = await UsuarioModel.findByPk(id_usuario);
        if (!usuario || usuario.puesto !== 'administrador') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error al validar administrador' });
    }
    return;
};