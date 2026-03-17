import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Persona from './Persona.js';

/**
 * Modelo Conductor
 * Especialización de una Persona que tiene licencia de conducción.
 */
const Conductor = sequelize.define('Conductor', {
  id_fk_persona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Persona, key: 'id_persona' },
  },
  licencia: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'conductor',
  timestamps: false,
});

// Relación de especialización (Uno a Uno con Persona)
Conductor.belongsTo(Persona, { foreignKey: 'id_fk_persona', as: 'persona' });
Persona.hasOne(Conductor, { foreignKey: 'id_fk_persona', as: 'conductor' });

export default Conductor;
