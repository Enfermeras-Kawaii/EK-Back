import { Request, Response, NextFunction } from 'express';

import UsuarioModel from '../models/usuario.model';

export const checkAdminExists = async (req: Request, res: Response, next: NextFunction) => {
    const { puesto } = req.body;
    if (puesto === 'administrador') {
        try {
            const adminExists = await UsuarioModel.findOne({ where: { puesto } });
            if (adminExists) {
                return res.status(400).json({ message: 'Ya existe un administrador' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al verificar la existencia de un administrador' });
        }
    }
    next();
    return;
};