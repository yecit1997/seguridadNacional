
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import { TipoReporte, StatusReporte } from './Catalogos.js';

/**
 * Modelo Reporte
 * Almacena las incidencias o informes generados por los usuarios.
 */
const Reporte = sequelize.define('Reporte', {
  id_reporte: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  status_reporte_id_status_reporte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: StatusReporte, key: 'id_status_reporte' },
  },
  tipo_reporte_id_tipo_reporte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: TipoReporte, key: 'id_tipo_reporte' },
  },
  usuario_id_usuario_generador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Usuario, key: 'id_usuario' },
  },
}, {
  tableName: 'reporte',
  timestamps: false,
});

// Relaciones
Reporte.belongsTo(Usuario, { foreignKey: 'usuario_id_usuario_generador', as: 'generador' });
Reporte.belongsTo(TipoReporte, { foreignKey: 'tipo_reporte_id_tipo_reporte', as: 'tipo' });
Reporte.belongsTo(StatusReporte, { foreignKey: 'status_reporte_id_status_reporte', as: 'status' });

Usuario.hasMany(Reporte, { foreignKey: 'usuario_id_usuario_generador', as: 'reportes' });

export default Reporte;

