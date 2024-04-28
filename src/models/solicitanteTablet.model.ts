import { Model, DataTypes, ModelOptions } from 'sequelize';
import { z } from 'zod';
import sequelize from '../db';

// Define el esquema de validación con Zod
export const SolicitudModelTabletSchema = z.object({
    id_solicitud: z.number().int().positive().min(1),
    nombre: z.string().min(1),
    apellido_materno: z.string().min(1),
    apellido_paterno: z.string().min(1),
    domicilio: z.string().min(1),
    puesto: z.string().min(1),
    genero: z.string().min(1),
    fecha_nacimiento: z.date(),
    rfc: z.string().min(1),
    correo_electronico: z.string().email(),
    salario_hora: z.number().positive(),
    experiencias_previas: z.string().min(1),
    detalles_ultimo_trabajo: z.string().min(1),
    ine: z.string().min(1),
    curp: z.string().min(1),
    acta_nacimiento: z.string().min(1),
    referencias_personales: z.string().min(1),
    titulo_tecnico: z.string().min(1),
    titulo_profesional: z.string().min(1),
});

// Define la interfaz de los atributos de la solicitud
interface SolicitudAttributes {
    id_solicitud: number;
    nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    domicilio: string;
    puesto: string;
    genero: string;
    fecha_nacimiento: Date;
    rfc: string;
    correo_electronico: string;
    salario_hora: number;
    experiencias_previas: string;
    detalles_ultimo_trabajo: string;
    ine: string;
    curp: string;
    acta_nacimiento: string;
    referencias_personales: string;
    titulo_tecnico: string;
    titulo_profesional: string;
}

// Define la interfaz de la instancia de la solicitud
interface SolicitudInstance extends Model<SolicitudAttributes>, SolicitudAttributes { }

// Define el modelo de Sequelize
export const SolicitudModelTablet = sequelize.define<SolicitudInstance>('Solicitud', {
    id_solicitud: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    puesto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    rfc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salario_hora: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    experiencias_previas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detalles_ultimo_trabajo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ine: {
        type: DataTypes.STRING,
        allowNull: false
    },
    curp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acta_nacimiento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    referencias_personales: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo_tecnico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo_profesional: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'solicitud_empleo',
    timestamps: false
} as ModelOptions<SolicitudInstance>);