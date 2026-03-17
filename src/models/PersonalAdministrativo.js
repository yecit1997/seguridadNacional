import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';

/**
 * Modelo PersonalAdministrativo
 * Usuarios encargados de labores administrativas.
 */
const PersonalAdministrativo = sequelize.define('PersonalAdministrativo', {
  usuario_id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Usuario, key: 'id_usuario' },
  },
  cargo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'personal_administrativo',
  timestamps: false,
});

// Relación de especialización
PersonalAdministrativo.belongsTo(Usuario, { foreignKey: 'usuario_id_usuario', as: 'usuario' });
Usuario.hasOne(PersonalAdministrativo, { foreignKey: 'usuario_id_usuario', as: 'personal' });

export default PersonalAdministrativo;
