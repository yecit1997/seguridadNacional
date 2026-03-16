const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Conductor = require('./Conductor');

const Vehiculo = sequelize.define('Vehiculo', {
  id_vehiculo:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  placa:                  { type: DataTypes.STRING(10), allowNull: false, unique: true },
  conductor_id_fk_persona:{ type: DataTypes.INTEGER },
}, { tableName: 'vehiculo' });

Vehiculo.belongsTo(Conductor, { foreignKey: 'conductor_id_fk_persona', as: 'conductor' });

module.exports = Vehiculo;
