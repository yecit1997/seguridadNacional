import Alerta from '../models/Alerta.js';
import Usuario from '../models/Usuario.js';
import Reporte from '../models/Reporte.js';
import { BaseService } from './BaseService.js';
import { AppError } from '../middleware/response.js';

class AlertaService extends BaseService {
  constructor() {
    super(Alerta);
  }

  /**
   * Crear alerta con validaciones de integridad (Paridad Spring).
   */
  async crear(data) {
    // 1. Validar usuario destinatario
    const usuario = await Usuario.findByPk(data.usuario_id_usuario_destinatario);
    if (!usuario) {
      throw new AppError(`Usuario destinatario ${data.usuario_id_usuario_destinatario} no encontrado`, 404);
    }

    // 2. Validar reporte si viene asignado
    if (data.reporte_id_reporte) {
      const reporte = await Reporte.findByPk(data.reporte_id_reporte);
      if (!reporte) {
        throw new AppError(`Reporte ${data.reporte_id_reporte} no encontrado`, 404);
      }
    }

    data.leida = false;
    data.fecha_hora = new Date();
    return await this.create(data);
  }

  /**
   * Listar alertas de un usuario.
   */
  async listarPorUsuario(idUsuario) {
    return await this.findAll({
      where: { usuario_id_usuario_destinatario: idUsuario },
      include: ['reporte'],
      order: [['fecha_hora', 'DESC']]
    });
  }

  /**
   * Listar alertas no leídas de un usuario.
   */
  async listarNoLeidas(idUsuario) {
    return await this.findAll({
      where: {
        usuario_id_usuario_destinatario: idUsuario,
        leida: false
      },
      include: ['reporte']
    });
  }

  /**
   * Marcar alerta como leída.
   */
  async marcarComoLeida(id) {
    const alerta = await this.findById(id);
    return await alerta.update({ leida: true });
  }
}

export default new AlertaService();
