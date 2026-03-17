import Rol from '../models/Rol.js';
import { TipoReporte, StatusReporte } from '../models/Catalogos.js';
import { BaseService } from './BaseService.js';

/**
 * Servicio para la gestión de Roles.
 * Extiende BaseService para CRUD genérico.
 */
class RolService extends BaseService {
  constructor() {
    super(Rol);
  }
}

/**
 * Servicio para TipoReporte.
 * Extiende BaseService para CRUD genérico.
 */
class TipoReporteService extends BaseService {
  constructor() {
    super(TipoReporte);
  }
}

/**
 * Servicio para StatusReporte.
 * Extiende BaseService para CRUD genérico.
 */
class StatusReporteService extends BaseService {
  constructor() {
    super(StatusReporte);
  }
}

export const rolService          = new RolService();
export const tipoReporteService  = new TipoReporteService();
export const statusReporteService = new StatusReporteService();

// Mantiene compatibilidad con el catalogosController que espera estos métodos agrupados
export const catalogosService = {
  // Tipos de Reporte
  listarTipos:     () => tipoReporteService.findAll(),
  buscarTipoPorId: (id) => tipoReporteService.findById(id),
  crearTipo:       (data) => tipoReporteService.create(data),
  actualizarTipo:  (id, data) => tipoReporteService.update(id, data),
  eliminarTipo:    (id) => tipoReporteService.delete(id),

  // Estados de Reporte
  listarStatus:     () => statusReporteService.findAll(),
  buscarStatusPorId: (id) => statusReporteService.findById(id),
  crearStatus:       (data) => statusReporteService.create(data),
  actualizarStatus:  (id, data) => statusReporteService.update(id, data),
  eliminarStatus:    (id) => statusReporteService.delete(id),
};
