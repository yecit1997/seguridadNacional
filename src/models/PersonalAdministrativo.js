const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UsuarioRol = require('./UsuarioRol');

const PersonalAdministrativo = sequelize.define('PersonalAdministrativo', {
  usuario_rol_id_usuario_rol: { type: DataTypes.INTEGER, primaryKey: true },
  cargo:                      { type: DataTypes.STRING(50) },
}, { tableName: 'personal_administrativo' });

PersonalAdministrativo.belongsTo(UsuarioRol, { foreignKey: 'usuario_rol_id_usuario_rol', as: 'usuarioRol' });

module.exports = PersonalAdministrativo;
