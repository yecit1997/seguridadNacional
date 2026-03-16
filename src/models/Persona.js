const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Persona = sequelize.define('Persona', {
  id_persona:  { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dni:         { type: DataTypes.STRING(20), allowNull: false, unique: true },
  nombre:      { type: DataTypes.STRING(100), allowNull: false },
  apellido:    { type: DataTypes.STRING(100) },
  correo:      { type: DataTypes.STRING(100), unique: true },
  telefono:    { type: DataTypes.STRING(20) },
}, { tableName: 'persona' });

module.exports = Persona;
