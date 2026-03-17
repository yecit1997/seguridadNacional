import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Modelo TipoReporte
 */
export const TipoReporte = sequelize.define('TipoReporte', {
  id_tipo_reporte: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'tipo_reporte',
  timestamps: false,
});

/**
 * Modelo StatusReporte
 */
export const StatusReporte = sequelize.define('StatusReporte', {
  id_status_reporte: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'status_reporte',
  timestamps: false,
});
