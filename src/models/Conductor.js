const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./Persona');

const Conductor = sequelize.define('Conductor', {
  id_fk_persona: { type: DataTypes.INTEGER, primaryKey: true },
  licencia:      { type: DataTypes.STRING(50), allowNull: false, unique: true },
}, { tableName: 'conductor' });

Conductor.belongsTo(Persona, { foreignKey: 'id_fk_persona', as: 'persona' });

module.exports = Conductor;
