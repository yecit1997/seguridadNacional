import Reporte from '../models/Reporte.js';
import Usuario from '../models/Usuario.js';
import { TipoReporte, StatusReporte } from '../models/Catalogos.js';
import { BaseService } from './BaseService.js';
import { AppError } from '../middleware/response.js';

class ReporteService extends BaseService {
  constructor() {
    super(Reporte);
  }

  /**
   * Listar reportes con sus relaciones.
   */
  async listarConDetalles(query = {}) {
    return await this.findAll({
      where: query,
      include: ['generador', 'tipo', 'status'],
      order: [['fecha_creacion', 'DESC']]
    });
  }

  /**
   * Crear reporte con validaciones de integridad (Paridad Spring).
   */
  async crearReporte(data) {
    // 1. Validar Usuario generador
    const usuario = await Usuario.findByPk(data.usuario_id_usuario_generador);
    if (!usuario) {
      throw new AppError(`Usuario generador ${data.usuario_id_usuario_generador} no encontrado`, 404);
    }

    // 2. Validar Tipo de Reporte
    const tipo = await TipoReporte.findByPk(data.tipo_reporte_id_tipo_reporte);
    if (!tipo) {
      throw new AppError(`Tipo de reporte ${data.tipo_reporte_id_tipo_reporte} no encontrado`, 404);
    }

    // 3. Validar Status de Reporte
    const status = await StatusReporte.findByPk(data.status_reporte_id_status_reporte);
    if (!status) {
      throw new AppError(`Estado de reporte ${data.status_reporte_id_status_reporte} no encontrado`, 404);
    }

    // RF01.3: Asegurar fecha de creación si no viene
    if (!data.fecha_creacion) {
      data.fecha_creacion = new Date();
    }
    return await this.create(data);
  }

  /**
   * Listar reportes por tipo.
   */
  async listarPorTipo(idTipo) {
    return await this.findAll({
      where: { tipo_reporte_id_tipo_reporte: idTipo },
      include: ['generador', 'status']
    });
  }

  /**
   * Listar reportes por estado.
   */
  async listarPorStatus(idStatus) {
    return await this.findAll({
      where: { status_reporte_id_status_reporte: idStatus },
      include: ['generador', 'tipo']
    });
  }

  /**
   * Actualizar estado del reporte (Paridad Spring).
   */
  async actualizarStatus(id, idStatus) {
    const reporte = await this.findById(id);
    return await reporte.update({ status_reporte_id_status_reporte: idStatus });
  }
}

export default new ReporteService();
