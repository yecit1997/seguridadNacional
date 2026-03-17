import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';

/**
 * Modelo Supervisor
 * Especialización de un Usuario que coordina a los Guardas.
 */
const Supervisor = sequelize.define('Supervisor', {
  usuario_id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Usuario, key: 'id_usuario' },
  },
  fecha_ascenso: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'supervisor',
  timestamps: false,
});

// Relación de especialización
Supervisor.belongsTo(Usuario, { foreignKey: 'usuario_id_usuario', as: 'usuario' });
Usuario.hasOne(Supervisor, { foreignKey: 'usuario_id_usuario', as: 'supervisor' });

export default Supervisor;
