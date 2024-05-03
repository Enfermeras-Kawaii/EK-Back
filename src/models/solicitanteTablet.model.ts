import { Model, DataTypes, ModelOptions } from 'sequelize';
import sequelize from '../db';

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

interface SolicitudInstance extends Model<SolicitudAttributes>, SolicitudAttributes { }

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