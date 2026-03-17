import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Reporte from './Reporte.js';

/**
 * Modelo Alerta
 * Notificaciones enviadas a los usuarios relacionadas con reportes o eventos.
 */
const Alerta = sequelize.define('Alerta', {
  id_alerta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  leida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  reporte_id_reporte: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Reporte, key: 'id_reporte' },
  },
  usuario_id_usuario_destinatario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Usuario, key: 'id_usuario' },
  },
}, {
  tableName: 'alerta',
  timestamps: false,
});

// Relaciones
Alerta.belongsTo(Usuario, { foreignKey: 'usuario_id_usuario_destinatario', as: 'destinatario' });
Alerta.belongsTo(Reporte, { foreignKey: 'reporte_id_reporte', as: 'reporte' });

Usuario.hasMany(Alerta, { foreignKey: 'usuario_id_usuario_destinatario', as: 'alertas' });

export default Alerta;
