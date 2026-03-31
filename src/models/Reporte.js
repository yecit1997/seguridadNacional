
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import { TipoReporte, StatusReporte } from './Catalogos.js';
import Vehiculo from './Vehiculo.js';
import Conductor from './Conductor.js';

/**
 * Modelo ReporteVehiculo
 * Registro de movimientos y novedades exclusivos de activos de transporte.
 */
const ReporteVehiculo = sequelize.define('ReporteVehiculo', {
  id_reporte_vehiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  entrada_salida: {
    type: DataTypes.ENUM('Entrada', 'Salida'),
    allowNull: false,
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
  vehiculo_id_vehiculo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Vehiculo, key: 'id_vehiculo' },
  },
  conductor_id_fk_persona: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Conductor, key: 'id_fk_persona' },
  },
}, {
  tableName: 'reporte_vehiculo',
  timestamps: false,
});

// Relaciones
ReporteVehiculo.belongsTo(Usuario, { foreignKey: 'usuario_id_usuario_generador', as: 'generador' });
ReporteVehiculo.belongsTo(TipoReporte, { foreignKey: 'tipo_reporte_id_tipo_reporte', as: 'tipo' });
ReporteVehiculo.belongsTo(StatusReporte, { foreignKey: 'status_reporte_id_status_reporte', as: 'status' });
ReporteVehiculo.belongsTo(Vehiculo, { foreignKey: 'vehiculo_id_vehiculo', as: 'vehiculo' });
ReporteVehiculo.belongsTo(Conductor, { foreignKey: 'conductor_id_fk_persona', as: 'conductor' });

Usuario.hasMany(ReporteVehiculo, { foreignKey: 'usuario_id_usuario_generador', as: 'reportes_vehiculo' });
Vehiculo.hasMany(ReporteVehiculo, { foreignKey: 'vehiculo_id_vehiculo', as: 'reportes' });
Conductor.hasMany(ReporteVehiculo, { foreignKey: 'conductor_id_fk_persona', as: 'reportes' });

export default ReporteVehiculo;
