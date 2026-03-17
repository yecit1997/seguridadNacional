import { AppError } from '../middleware/response.js';

/**
 * Clase Base para los Servicios.
 * Implementa operaciones CRUD genéricas y utilidades comunes.
 */
export class BaseService {
  constructor(model) {
    this.model = model;
  }

  /**
   * Obtener todos los registros con opciones opcionales.
   */
  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  /**
   * Buscar un registro por su ID primario.
   */
  async findById(id, options = {}) {
    const record = await this.model.findByPk(id, options);
    if (!record) {
      throw new AppError(`${this.model.name} no encontrado`, 404);
    }
    return record;
  }

  /**
   * Crear un nuevo registro.
   */
  async create(data) {
    return await this.model.create(data);
  }

  /**
   * Actualizar un registro existente.
   */
  async update(id, data) {
    const record = await this.findById(id);
    return await record.update(data);
  }

  /**
   * Eliminar un registro.
   */
  async delete(id) {
    const record = await this.findById(id);
    await record.destroy();
    return true;
  }
}
