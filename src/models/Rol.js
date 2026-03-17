import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Modelo Rol
 * Define los permisos o roles que puede tener un usuario.
 */
const Rol = sequelize.define('Rol', {
  id_rol: {
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
  tableName: 'rol',
  timestamps: false,
});

export default Rol;
