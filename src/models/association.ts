import SolicitudModel from './solucitud.model';
import TelefonosModel from './telefonos.model';

SolicitudModel.hasMany(TelefonosModel, {
    foreignKey: 'id_solicitud',
    as: 'telefonos'
});

TelefonosModel.belongsTo(SolicitudModel, {
    foreignKey: 'id_solicitud',
    as: 'solicitud'
});