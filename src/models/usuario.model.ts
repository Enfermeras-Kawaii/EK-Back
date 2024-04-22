import { Model, DataTypes, ModelOptions } from 'sequelize';
import sequelize from '../db';

interface UsuarioAttributes {
    id_usuario: string;
    nombre: string;
    correo_electronico: string;
    contrasena: string;
    puesto: string;
    resetPasswordCode?: string;
    resetPasswordExpires?: Date;
    verificationCode?: string;
    emailVerificated: boolean;
}

interface UsuarioInstance extends Model<UsuarioAttributes>, UsuarioAttributes { }

const UsuarioModel = sequelize.define<UsuarioInstance>('Usuario', {
    id_usuario: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    puesto: {
        type: DataTypes.ENUM('enfermero', 'cuidador', 'paciente', 'administrador'),
        allowNull: false
    },
    resetPasswordCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emailVerificated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: 'usuario',
    timestamps: false
} as ModelOptions<UsuarioInstance>);

export default UsuarioModel;