import Persona from '../models/Persona.js';
import { BaseService } from './BaseService.js';
import { AppError } from '../middleware/response.js';

class PersonaService extends BaseService {
  constructor() {
    super(Persona);
  }

  /**
   * Buscar persona por DNI.
   */
  async findByDni(dni) {
    const persona = await Persona.findOne({ where: { dni } });
    if (!persona) {
      throw new AppError('Persona no encontrada con el DNI proporcionado', 404);
    }
    return persona;
  }
}

export default new PersonaService();
