import Conductor from '../models/Conductor.js';
import Persona from '../models/Persona.js';
import { BaseService } from './BaseService.js';
import { AppError } from '../middleware/response.js';

class ConductorService extends BaseService {
  constructor() {
    super(Conductor);
  }

  /**
   * Sobrescribir creación para validar existencia de persona y licencia única (Paridad Spring).
   */
  async create(data) {
    // 1. Validar existencia de Persona
    const persona = await Persona.findByPk(data.id_fk_persona);
    if (!persona) {
      throw new AppError(`Persona ${data.id_fk_persona} no encontrada`, 404);
    }

    // 2. Validar licencia única
    const existe = await this.model.findOne({ where: { licencia: data.licencia } });
    if (existe) {
      throw new AppError('Ya existe un conductor con esa licencia', 400);
    }
    return await super.create(data);
  }

  /**
   * Sobrescribir actualización para validar licencia única.
   */
  async update(id, data) {
    const conductor = await this.findById(id);
    if (data.licencia && data.licencia !== conductor.licencia) {
      const existe = await this.model.findOne({ where: { licencia: data.licencia } });
      if (existe) {
        throw new AppError('Ya existe un conductor con la licencia ' + data.licencia, 400);
      }
    }
    return await conductor.update(data);
  }
}

export default new ConductorService();
