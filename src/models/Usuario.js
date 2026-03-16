const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./Persona');

const Usuario = sequelize.define('Usuario', {
  id_usuario:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_usuario:  { type: DataTypes.STRING(50), allowNull: false, unique: true },
  contrasena:      { type: DataTypes.STRING(255), allowNull: false },
  status:          { type: DataTypes.TINYINT, defaultValue: 1 },
  persona_id_persona: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'usuario' });

Usuario.belongsTo(Persona, { foreignKey: 'persona_id_persona', as: 'persona' });

module.exports = Usuario;
