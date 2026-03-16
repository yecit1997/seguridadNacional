const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UsuarioRol = require('./UsuarioRol');
const Supervisor = require('./Supervisor');

const Guarda = sequelize.define('Guarda', {
  usuario_rol_id_usuario_rol: { type: DataTypes.INTEGER, primaryKey: true },
  areaAsignada:               { type: DataTypes.STRING(50) }, // camelCase exacto como en BD
  supervisor_id_supervisor:   { type: DataTypes.INTEGER },
}, { tableName: 'guarda' });

Guarda.belongsTo(UsuarioRol, { foreignKey: 'usuario_rol_id_usuario_rol', as: 'usuarioRol' });
Guarda.belongsTo(Supervisor, { foreignKey: 'supervisor_id_supervisor',   as: 'supervisor' });

module.exports = Guarda;
