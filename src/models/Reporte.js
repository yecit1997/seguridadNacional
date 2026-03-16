const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const { TipoReporte, StatusReporte } = require('./Catalogos');

const Reporte = sequelize.define('Reporte', {
  id_reporte:                       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fecha_creacion:                   { type: DataTypes.DATE, allowNull: false },
  descripcion:                      { type: DataTypes.TEXT },
  usuario_id_usuario_generador:     { type: DataTypes.INTEGER, allowNull: false },
  tipo_reporte_id_tipo_reporte:     { type: DataTypes.INTEGER, allowNull: false },
  status_reporte_id_status_reporte: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'reporte' });

Reporte.belongsTo(Usuario,       { foreignKey: 'usuario_id_usuario_generador',     as: 'usuarioGenerador' });
Reporte.belongsTo(TipoReporte,   { foreignKey: 'tipo_reporte_id_tipo_reporte',     as: 'tipoReporte'      });
Reporte.belongsTo(StatusReporte, { foreignKey: 'status_reporte_id_status_reporte', as: 'statusReporte'    });

module.exports = Reporte;
