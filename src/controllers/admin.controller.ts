import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UsuarioModel from '../models/usuario.model';

export const createAdmin = async (req: Request, res: Response) => {
    const { nombre, correo_electronico, contrasena } = req.body;

    if (!correo_electronico || !contrasena || !nombre) {
        return res.status(400).json({ message: 'Todos los datos son requeridos.' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const codigoVerificacionCorreo = Math.floor(100000 + Math.random() * 900000).toString();
    const id_usuario = 'adm1-' + uuidv4();

    try {
        const usuario = await UsuarioModel.create({ id_usuario, nombre, correo_electronico, contrasena: hashedPassword, puesto: 'administrador', verificationCode: codigoVerificacionCorreo, emailVerificated: true });

        // const transporter = nodemailer.createTransport({
        //     service: 'hotmail',
        //     auth: {
        //         user: process.env.EMAIL_USERNAME,
        //         pass: process.env.EMAIL_PASSWORD
        //     }
        // });

        // const mailOptions = {
        //     to: correo_electronico,
        //     from: process.env.EMAIL_USERNAME,
        //     subject: 'Verificación de correo electrónico',
        //     text: `Por favor, verifica tu correo electrónico ingresando el siguiente código en la aplicación:\n\nCódigo de verificación: ${codigoVerificacionCorreo}`
        // };

        // await transporter.sendMail(mailOptions);

        const token = jwt.sign({ id_usuario: usuario.id_usuario }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        res.status(201).json({ message: 'Se ha enviado un correo electrónico con más instrucciones para verificar tu correo electrónico' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear administrador', error });
    }
    return;
};

export const verifyEmail = async (req: Request, res: Response) => {
    const { codigo } = req.body;

    if (!codigo) {
        return res.status(400).json({ message: 'Código es requerido' });
    }

    try {
        const usuario = await UsuarioModel.findOne({ where: { verificationCode: codigo } });
        if (!usuario) {
            return res.status(400).json({ message: 'Código de verificación de correo electrónico no válido' });
        }

        usuario.verificationCode = undefined;
        usuario.emailVerificated = true;

        await usuario.save();

        res.status(200).json({ message: 'Correo electrónico verificado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar el correo electrónico', error });
    }
    return;
};

export const forgotPassword = async (req: Request, res: Response) => {
    const correo_electronico = req.body.correo_electronico;

    if (!correo_electronico) {
        return res.status(400).json({ message: 'Correo electrónico es requerido' });
    }

    try {
        const usuario = await UsuarioModel.findOne({ where: { correo_electronico } });
        if (!usuario) {
            return res.status(404).json({ message: 'No se encontró ningún usuario con ese correo electrónico' });
        }

        const resetPasswordCode = Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos
        const resetPasswordExpires = new Date(Date.now() + Number(process.env.RESET_TOKEN_EXPIRES)); // 1 hour

        usuario.resetPasswordCode = resetPasswordCode;
        usuario.resetPasswordExpires = resetPasswordExpires;

        await usuario.save();

        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            to: correo_electronico,
            from: process.env.EMAIL_USERNAME,
            subject: 'Restablecimiento de contraseña',
            text: `Has solicitado el restablecimiento de tu contraseña. Por favor, ingresa el siguiente código en la aplicación para completar el proceso:\n\nCódigo de restablecimiento: ${resetPasswordCode}\n\nSi no solicitaste esto, por favor ignora este correo electrónico y tu contraseña permanecerá sin cambios.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Se ha enviado un correo electrónico con más instrucciones' });
    } catch (error) {
        res.status(500).json({ message: 'Error al restablecer la contraseña', error });
    }
    return;
};

export const resetPassword = async (req: Request, res: Response) => {
    const { codigo, newPassword } = req.body;

    if (!codigo || !newPassword) {
        return res.status(400).json({ message: 'Código y nueva contraseña son requeridos' });
    }

    try {
        const usuario = await UsuarioModel.findOne({ where: { resetPasswordCode: codigo } });
        if (!usuario) {
            return res.status(400).json({ message: 'Código de restablecimiento de contraseña no válido o expirado' });
        }

        usuario.contrasena = await bcrypt.hash(newPassword, 10);
        usuario.resetPasswordCode = undefined;
        usuario.resetPasswordExpires = undefined;

        await usuario.save();

        res.status(200).json({ message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al restablecer la contraseña' });
    }
    return;
};


export const updatePassword = async (req: Request, res: Response) => {
    const { id_usuario, currentPassword, newPassword } = req.body;

    if (!id_usuario || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'ID de usuario, contraseña actual y nueva contraseña son requeridos' });
    }

    try {
        const usuario = await UsuarioModel.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(currentPassword, usuario.contrasena);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        usuario.contrasena = await bcrypt.hash(newPassword, 10);

        await usuario.save();

        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }
    return;
};

export const login = async (req: Request, res: Response) => {
    const { correo_electronico, contrasena } = req.body;

    if (!correo_electronico || !contrasena) {
        return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos' });
    }

    try {
        const usuario = await UsuarioModel.findOne({ where: { correo_electronico } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        if (!usuario.emailVerificated) {
            return res.status(401).json({ message: 'Correo electrónico no verificado. Por favor, verifica tu correo electrónico.' });
        }

        const token = jwt.sign({ id_usuario: usuario.id_usuario }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
    return;
};