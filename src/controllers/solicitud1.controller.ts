import { Request, Response } from 'express';
import crypto from 'crypto';

import SolicitudModel from '../models/solucitud.model';
import TelefonosModel from '../models/telefonos.model';

const algorithm = 'aes-256-ctr';
const secret = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const encrypt = (text: string) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secret, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

const decrypt = (encryptedText: string) => {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts.shift() || '', 'hex');
    const encrypted = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secret, iv);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return decrypted.toString();
};

export const createSolicitudEmpleo = async (req: Request, res: Response) => {

    const id_solicitud = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

    try {

        const { nombre, apellido_paterno, apellido_materno, fecha_nacimiento, correo_electronico, experiencias_previas, detalles_ultimo_trabajo, rfc, domicilio, genero, puesto, salario_hora, ine, acta_nacimiento, curp, referencias_personales, titulo_profesional, titulo_tecnico } = req.body;

        const solicitudEmpleo = await SolicitudModel.create({
            id_solicitud,
            nombre,
            domicilio,
            genero,
            puesto,
            salario_hora,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            correo_electronico,
            experiencias_previas,
            detalles_ultimo_trabajo,
            rfc: encrypt(rfc),
            ine: encrypt(ine),
            acta_nacimiento: encrypt(acta_nacimiento),
            curp: encrypt(curp),
            referencias_personales: encrypt(referencias_personales),
            titulo_profesional: encrypt(titulo_profesional),
            titulo_tecnico: encrypt(titulo_tecnico)
        });

        const telefonosData = req.body.telefonos.map((telefono: any) => ({
            id_solicitud: id_solicitud,
            telefono: telefono
        }));

        for (const telefonoData of telefonosData) {
            await TelefonosModel.create(telefonoData);
        }

        res.json({ message: 'Solicitud de empleo creada exitosamente', solicitudEmpleo });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear la solicitud de empleo', error });
        return;
    }
};

export const getSolicitudEmpleo = async (req: Request, res: Response) => {
    try {
        const solicitud = await SolicitudModel.findOne({
            where: { id_solicitud: req.params.id },
            include: [{ model: TelefonosModel, as: 'telefonos' }]
        });

        if (solicitud) {
            solicitud.rfc = decrypt(solicitud.rfc);
            solicitud.ine = decrypt(solicitud.ine);
            solicitud.acta_nacimiento = decrypt(solicitud.acta_nacimiento);
            solicitud.curp = decrypt(solicitud.curp);
            solicitud.referencias_personales = decrypt(solicitud.referencias_personales);
            solicitud.titulo_profesional = decrypt(solicitud.titulo_profesional);
            solicitud.titulo_tecnico = decrypt(solicitud.titulo_tecnico);

            res.json(solicitud);
        } else {
            res.status(404).json({ error: 'Solicitud no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la solicitud de empleo", error });
    }
};

export const getSolicitudesEmpleo = async (_req: Request, res: Response) => {
    try {
        const solicitudes = await SolicitudModel.findAll({
            include: [{ model: TelefonosModel, as: 'telefonos' }]
        });

        solicitudes.forEach(solicitud => {
            solicitud.rfc = decrypt(solicitud.rfc);
            solicitud.ine = decrypt(solicitud.ine);
            solicitud.acta_nacimiento = decrypt(solicitud.acta_nacimiento);
            solicitud.curp = decrypt(solicitud.curp);
            solicitud.referencias_personales = decrypt(solicitud.referencias_personales);
            solicitud.titulo_profesional = decrypt(solicitud.titulo_profesional);
            solicitud.titulo_tecnico = decrypt(solicitud.titulo_tecnico);
        });

        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las solicitudes de empleo", error });
    }
};

export const deleteSolicitudEmpleo = async (req: Request, res: Response) => {
    try {
        const solicitud = await SolicitudModel.findOne({ where: { id_solicitud: req.params.id } });

        if (solicitud) {
            await SolicitudModel.destroy({ where: { id_solicitud: req.params.id } });
            res.json({ message: 'Solicitud de empleo eliminada exitosamente' });
        } else {
            res.status(404).json({ error: 'Solicitud no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la solicitud de empleo", error });
    }
};

export const updateSolicitudEmpleo = async (req: Request, res: Response) => {
    try {
        const solicitud = await SolicitudModel.findOne({ where: { id_solicitud: req.params.id } });

        if (solicitud) {
            const { nombre, apellido_paterno, apellido_materno, fecha_nacimiento, correo_electronico, experiencias_previas, detalles_ultimo_trabajo, rfc, domicilio, genero, puesto, salario, ine, acta_nacimiento, curp, referencias_personales, titulo_profesional, titulo_tecnico } = req.body;

            await SolicitudModel.update({
                nombre,
                domicilio,
                genero,
                puesto,
                salario_hora: salario,
                apellido_paterno,
                apellido_materno,
                fecha_nacimiento,
                correo_electronico,
                experiencias_previas,
                detalles_ultimo_trabajo,
                rfc: encrypt(rfc),
                ine: encrypt(ine),
                acta_nacimiento: encrypt(acta_nacimiento),
                curp: encrypt(curp),
                referencias_personales: encrypt(referencias_personales),
                titulo_profesional: encrypt(titulo_profesional),
                titulo_tecnico: encrypt(titulo_tecnico)
            }, { where: { id_solicitud: req.params.id } });

            res.json({ message: 'Solicitud de empleo actualizada exitosamente' });
        } else {
            res.status(404).json({ error: 'Solicitud no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la solicitud de empleo", error });
    }
};