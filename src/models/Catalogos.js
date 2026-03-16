const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoReporte = sequelize.define('TipoReporte', {
  id_tipo_reporte: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:          { type: DataTypes.STRING(50), allowNull: false, unique: true },
}, { tableName: 'tipo_reporte' });

const StatusReporte = sequelize.define('StatusReporte', {
  id_status_reporte: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:            { type: DataTypes.STRING(50), allowNull: false, unique: true },
}, { tableName: 'status_reporte' });

module.exports = { TipoReporte, StatusReporte };
