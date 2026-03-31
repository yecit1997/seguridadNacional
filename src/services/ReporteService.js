import ReporteVehiculo from '../models/Reporte.js';
import ReportePersonal from '../models/ReportePersonal.js';
import Usuario from '../models/Usuario.js';
import { TipoReporte, StatusReporte } from '../models/Catalogos.js';
import Vehiculo from '../models/Vehiculo.js';
import Conductor from '../models/Conductor.js';
import { BaseService } from './BaseService.js';
import { AppError } from '../middleware/response.js';

class ReporteService extends BaseService {
  constructor() {
    super(ReporteVehiculo);
  }

  /**
   * Listar todos los reportes (vehículos + personal) con detalles
   */
  async listarConDetalles() {
    const vehiculos = await ReporteVehiculo.findAll({
      include: [
        { model: Usuario, as: 'generador' },
        { model: TipoReporte, as: 'tipo' },
        { model: StatusReporte, as: 'status' },
        { model: Vehiculo, as: 'vehiculo' }
      ],
      order: [['fecha_creacion', 'DESC']]
    });
    
    const personal = await ReportePersonal.findAll({
      include: [
        { model: Usuario, as: 'generador' },
        { model: TipoReporte, as: 'tipo' },
        { model: StatusReporte, as: 'status' }
      ],
      order: [['fecha_creacion', 'DESC']]
    });

    // Unir y ordenar por fecha
    const todos = [...vehiculos.map(r => ({ ...r.toJSON(), tabla: 'vehiculo' })), 
                  ...personal.map(r => ({ ...r.toJSON(), tabla: 'personal' }))]
                  .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
    
    return todos;
  }

  async validateBasics(data) {
    // RF01.3: Asegurar fecha de creación si no viene
    if (!data.fecha_creacion) data.fecha_creacion = new Date();

    // Mapeo preventivo para solucionar Error 400 del frontend (Soporte Multi-estándar)
    if (data.idUsuario) data.usuario_id_usuario_generador = data.idUsuario;
    if (data.idTipo) data.tipo_reporte_id_tipo_reporte = data.idTipo;
    if (data.idStatus) data.status_reporte_id_status_reporte = data.idStatus;
    if (data.idVehiculo) data.vehiculo_id_vehiculo = data.idVehiculo;
    if (data.idPersona) data.persona_id_persona = data.idPersona;
    
    // Fallback para IDs comunes
    if (data.usuario_id) data.usuario_id_usuario_generador = data.usuario_id;

    // Normalizar ENUM para MySQL
    if (data.entrada_salida) {
      data.entrada_salida = data.entrada_salida.charAt(0).toUpperCase() + data.entrada_salida.slice(1).toLowerCase();
    }

    const usuario = await Usuario.findByPk(data.usuario_id_usuario_generador);
    if (!usuario) throw new AppError(`Usuario ${data.usuario_id_usuario_generador} no encontrado`, 404);

    const tipo = await TipoReporte.findByPk(data.tipo_reporte_id_tipo_reporte);
    if (!tipo) throw new AppError(`Tipo ${data.tipo_reporte_id_tipo_reporte} no encontrado`, 404);

    const status = await StatusReporte.findByPk(data.status_reporte_id_status_reporte);
    if (!status) throw new AppError(`Estado ${data.status_reporte_id_status_reporte} no encontrado`, 404);
  }

  async crearReporteVehiculo(data) {
    await this.validateBasics(data);
    
    // Si viene la placa, buscamos el ID del vehículo automáticamente
    if (data.placa && !data.vehiculo_id_vehiculo) {
      const v = await Vehiculo.findOne({ where: { placa: data.placa } });
      if (v) data.vehiculo_id_vehiculo = v.id_vehiculo;
    }

    if (!data.vehiculo_id_vehiculo) throw new AppError('Vehículo no especificado', 400);
    return await ReporteVehiculo.create(data);
  }

  async crearReportePersonal(data) {
    await this.validateBasics(data);
    if (!data.area) throw new AppError('El área es obligatoria para reportes de personal', 400);
    if (!data.persona_id_persona) throw new AppError('Persona no especificada', 400);
    return await ReportePersonal.create(data);
  }

  async crearReporte(data) {
    // Lógica para decidir qué tabla usar basada en los campos enviados
    if (data.vehiculo_id_vehiculo || data.placa || data.idVehiculo) {
      return await this.crearReporteVehiculo(data);
    }
    return await this.crearReportePersonal(data);
  }

  async listarVehiculosConDetalles() {
    return await ReporteVehiculo.findAll({
      include: ['generador', 'tipo', 'status', 'vehiculo', 'conductor'],
      order: [['fecha_creacion', 'DESC']]
    });
  }

  async listarPersonalConDetalles() {
    return await ReportePersonal.findAll({
      include: ['generador', 'tipo', 'status', 'persona'],
      order: [['fecha_creacion', 'DESC']]
    });
  }

  async listarPorTipo(idTipo) {
    const idTipoNum = parseInt(idTipo);
    
    const vehiculos = await ReporteVehiculo.findAll({
      where: { tipo_reporte_id_tipo_reporte: idTipoNum },
      include: [
        { model: Usuario, as: 'generador' },
        { model: StatusReporte, as: 'status' },
        { model: Vehiculo, as: 'vehiculo' },
        { model: TipoReporte, as: 'tipo' }
      ]
    });
    const personal = await ReportePersonal.findAll({
      where: { tipo_reporte_id_tipo_reporte: idTipoNum },
      include: [
        { model: Usuario, as: 'generador' },
        { model: StatusReporte, as: 'status' },
        { model: TipoReporte, as: 'tipo' }
      ]
    });
    return [...vehiculos, ...personal].sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
  }

  /**
   * Listar reportes por estado.
   */
  async listarPorStatus(idStatus) {
    const idStatusNum = parseInt(idStatus);
    
    const vehiculos = await ReporteVehiculo.findAll({
      where: { status_reporte_id_status_reporte: idStatusNum },
      include: [
        { model: Usuario, as: 'generador' },
        { model: TipoReporte, as: 'tipo' },
        { model: StatusReporte, as: 'status' },
        { model: Vehiculo, as: 'vehiculo' }
      ]
    });
    const personal = await ReportePersonal.findAll({
      where: { status_reporte_id_status_reporte: idStatusNum },
      include: [
        { model: Usuario, as: 'generador' },
        { model: TipoReporte, as: 'tipo' },
        { model: StatusReporte, as: 'status' }
      ]
    });
    return [...vehiculos, ...personal].sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
  }

  /**
   * Actualizar estado del reporte (Paridad Spring).
   */
  async actualizarStatus(id, idStatus) {
    // Primero intentamos buscar en Vehículos, luego en Personal
    let reporte = await ReporteVehiculo.findByPk(id) || await ReportePersonal.findByPk(id);
    if (!reporte) throw new AppError('Reporte no encontrado', 404);
    return await reporte.update({ status_reporte_id_status_reporte: idStatus });
  }

  /**
   * Actualizar un reporte (busca en ambas tablas).
   */
  async update(id, data) {
    let reporte = await ReporteVehiculo.findByPk(id) || await ReportePersonal.findByPk(id);
    if (!reporte) throw new AppError('Reporte no encontrado', 404);
    
    // Filtrar campos válidos para actualizar
    const camposPermitidos = ['descripcion', 'entrada_salida', 'area', 'fecha_creacion'];
    const dataFiltrada = {};
    
    for (const campo of camposPermitidos) {
      if (data[campo] !== undefined) {
        dataFiltrada[campo] = data[campo];
      }
    }
    
    return await reporte.update(dataFiltrada);
  }

  /**
   * Eliminar un reporte (busca en ambas tablas).
   */
  async delete(id) {
    let reporte = await ReporteVehiculo.findByPk(id) || await ReportePersonal.findByPk(id);
    if (!reporte) throw new AppError('Reporte no encontrado', 404);
    await reporte.destroy();
    return true;
  }
}

export default new ReporteService();
