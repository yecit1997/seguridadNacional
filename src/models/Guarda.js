import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Supervisor from './Supervisor.js';

/**
 * Modelo Guarda
 * Personal de seguridad bajo la supervisión de un Supervisor.
 */
const Guarda = sequelize.define('Guarda', {
  usuario_id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Usuario, key: 'id_usuario' },
  },
  areaAsignada: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'areaAsignada',
  },
  supervisor_id_supervisor: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Supervisor, key: 'usuario_id_usuario' },
  },
}, {
  tableName: 'guarda',
  timestamps: false, // La tabla no tiene columnas created_at/updated_at en el DDL
});

// Relaciones
Guarda.belongsTo(Usuario, { foreignKey: 'usuario_id_usuario', as: 'usuario' });
Guarda.belongsTo(Supervisor, { foreignKey: 'supervisor_id_supervisor', as: 'supervisor' });

Usuario.hasOne(Guarda, { foreignKey: 'usuario_id_usuario', as: 'guarda' });
Supervisor.hasMany(Guarda, { foreignKey: 'supervisor_id_supervisor', as: 'guardas' });

export default Guarda;
