const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Rol = require('./Rol');

const UsuarioRol = sequelize.define('UsuarioRol', {
  id_usuario_rol:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id_usuario: { type: DataTypes.INTEGER, allowNull: false },
  rol_id_rol:         { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'usuario_rol' });

UsuarioRol.belongsTo(Usuario, { foreignKey: 'usuario_id_usuario', as: 'usuario' });
UsuarioRol.belongsTo(Rol,     { foreignKey: 'rol_id_rol',         as: 'rol'     });

module.exports = UsuarioRol;
