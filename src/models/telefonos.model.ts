import { Model, DataTypes, ModelOptions } from 'sequelize';

import sequelize from '../db';

interface TelefonosAtributtes {
    id_solicitud: number;
    telefono: string;
}

interface TelefonosInstance extends Model<TelefonosAtributtes>, TelefonosAtributtes { }

const TelefonosModel = sequelize.define<TelefonosInstance>('Telefonos', {
    id_solicitud: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'telefonos',
    timestamps: false
} as ModelOptions<TelefonosInstance>);

export default TelefonosModel;