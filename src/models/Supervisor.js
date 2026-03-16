const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UsuarioRol = require('./UsuarioRol');

const Supervisor = sequelize.define('Supervisor', {
  usuario_rol_id_usuario_rol: { type: DataTypes.INTEGER, primaryKey: true },
  fecha_ascenso:              { type: DataTypes.DATEONLY },
}, { tableName: 'supervisor' });

Supervisor.belongsTo(UsuarioRol, { foreignKey: 'usuario_rol_id_usuario_rol', as: 'usuarioRol' });

module.exports = Supervisor;
