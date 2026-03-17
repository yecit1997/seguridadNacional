import sequelize from '../config/database.js';
import Persona from './Persona.js';
import Usuario from './Usuario.js';
import Rol from './Rol.js';
import UsuarioRol from './UsuarioRol.js';
import Supervisor from './Supervisor.js';
import Guarda from './Guarda.js';
import PersonalAdministrativo from './PersonalAdministrativo.js';
import Conductor from './Conductor.js';
import Vehiculo from './Vehiculo.js';
import { TipoReporte, StatusReporte } from './Catalogos.js';
import Reporte from './Reporte.js';
import Alerta from './Alerta.js';

/**
 * Módulo de Exportación Central de Modelos
 * Asegura que todas las asociaciones se carguen correctamente al iniciar el sistema.
 */

export {
  sequelize,
  Persona,
  Usuario,
  Rol,
  UsuarioRol,
  Supervisor,
  Guarda,
  PersonalAdministrativo,
  Conductor,
  Vehiculo,
  TipoReporte,
  StatusReporte,
  Reporte,
  Alerta
};
