const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Reporte = require('./Reporte');

const Alerta = sequelize.define('Alerta', {
  id_alerta:                       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fecha_hora:                      { type: DataTypes.DATE, allowNull: false },
  mensaje:                         { type: DataTypes.TEXT, allowNull: false },
  leida:                           { type: DataTypes.TINYINT, defaultValue: 0 },
  usuario_id_usuario_destinatario: { type: DataTypes.INTEGER, allowNull: false },
  reporte_id_reporte:              { type: DataTypes.INTEGER },
}, { tableName: 'alerta' });

Alerta.belongsTo(Usuario, { foreignKey: 'usuario_id_usuario_destinatario', as: 'usuarioDestinatario' });
Alerta.belongsTo(Reporte, { foreignKey: 'reporte_id_reporte',              as: 'reporte'             });

module.exports = Alerta;
