import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Rol from './Rol.js';

/**
 * Modelo Intermedio UsuarioRol
 * Representa la relación muchos a muchos entre Usuarios y Roles.
 */
const UsuarioRol = sequelize.define('UsuarioRol', {
  usuario_id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Usuario,
      key: 'id_usuario',
    },
  },
  rol_id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Rol,
      key: 'id_rol',
    },
  },
}, {
  tableName: 'usuario_rol',
  timestamps: false,
});

// Definición de la relación Muchos a Muchos
Usuario.belongsToMany(Rol, {
  through: UsuarioRol,
  foreignKey: 'usuario_id_usuario',
  otherKey: 'rol_id_rol',
  as: 'roles',
});

Rol.belongsToMany(Usuario, {
  through: UsuarioRol,
  foreignKey: 'rol_id_rol',
  otherKey: 'usuario_id_usuario',
  as: 'usuarios',
});

export default UsuarioRol;
