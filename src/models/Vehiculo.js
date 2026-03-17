import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Conductor from './Conductor.js';

/**
 * Modelo Vehiculo
 * Activos de transporte del sistema, asignables a un conductor.
 */
const Vehiculo = sequelize.define('Vehiculo', {
  id_vehiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placa: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  conductor_id_fk_persona: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Conductor, key: 'id_fk_persona' },
  },
}, {
  tableName: 'vehiculo',
  timestamps: false,
});

// Relación
Vehiculo.belongsTo(Conductor, { foreignKey: 'conductor_id_fk_persona', as: 'conductor' });
Conductor.hasMany(Vehiculo, { foreignKey: 'conductor_id_fk_persona', as: 'vehiculos' });

export default Vehiculo;
