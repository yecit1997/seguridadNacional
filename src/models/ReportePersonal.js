import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Persona from './Persona.js';
import { TipoReporte, StatusReporte } from './Catalogos.js';

// Modelo de Reporte Personal
const ReportePersonal = sequelize.define('ReportePersonal', {
  id_reporte_personal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  area: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  status_reporte_id_status_reporte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: StatusReporte, key: 'id_status_reporte' },
  },
  tipo_reporte_id_tipo_reporte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: TipoReporte, key: 'id_tipo_reporte' },
  },
  usuario_id_usuario_generador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Usuario, key: 'id_usuario' },
  },
  persona_id_persona: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Persona, key: 'id_persona' },
  },
}, {
  tableName: 'reporte_personal',
  timestamps: false,
});

ReportePersonal.belongsTo(Usuario, { foreignKey: 'usuario_id_usuario_generador', as: 'generador' });
ReportePersonal.belongsTo(Persona, { foreignKey: 'persona_id_persona', as: 'persona' });
ReportePersonal.belongsTo(TipoReporte, { foreignKey: 'tipo_reporte_id_tipo_reporte', as: 'tipo' });
ReportePersonal.belongsTo(StatusReporte, { foreignKey: 'status_reporte_id_status_reporte', as: 'status' });

Usuario.hasMany(ReportePersonal, { foreignKey: 'usuario_id_usuario_generador', as: 'reportes_personal' });
Persona.hasMany(ReportePersonal, { foreignKey: 'persona_id_persona', as: 'reportes' });

export default ReportePersonal;
