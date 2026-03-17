import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Modelo Persona
 * Almacena los datos básicos de identificación de cualquier individuo en el sistema.
 */
const Persona = sequelize.define('Persona', {
  id_persona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dni: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  correo: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'persona',
  timestamps: false,
});

export default Persona;
