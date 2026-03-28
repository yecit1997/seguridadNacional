import Supervisor from '../models/Supervisor.js';
import Guarda from '../models/Guarda.js';
import PersonalAdministrativo from '../models/PersonalAdministrativo.js';
import Vehiculo from '../models/Vehiculo.js';
import Usuario from '../models/Usuario.js';
import { BaseService } from './BaseService.js';
import { AppError } from '../middleware/response.js';

class SupervisorService extends BaseService {
  constructor() { 
    super(Supervisor); 
  }
  
  async listarConDetalles() {
    return await this.findAll({ include: ['usuario'] });
  }

  async create(data) {
    const usuario = await Usuario.findByPk(data.usuario_id_usuario);
    if (!usuario) {
      throw new AppError(`Usuario ${data.usuario_id_usuario} no encontrado`, 404);
    }
    return await super.create(data);
  }
}

class GuardaService extends BaseService {
  constructor() { 
    super(Guarda); 
  }

  async listarConDetalles() {
    return await this.findAll({ include: ['usuario', 'supervisor'] });
  }

  async listarPorSupervisor(supervisorId) {
    return await this.findAll({
      where: { supervisor_id_supervisor: supervisorId },
      include: ['usuario']
    });
  }

  async create(data) {
    const usuario = await Usuario.findByPk(data.usuario_id_usuario);
    if (!usuario) {
      throw new AppError(`Usuario ${data.usuario_id_usuario} no encontrado`, 404);
    }
    if (data.supervisor_id_supervisor) {
      const sup = await Supervisor.findByPk(data.supervisor_id_supervisor);
      if (!sup) {
        throw new AppError(`Supervisor ${data.supervisor_id_supervisor} no encontrado`, 404);
      }
    }
    return await super.create(data);
  }
}

class PersonalService extends BaseService {
  constructor() { 
    super(PersonalAdministrativo); 
  }

  async listarConDetalles() {
    return await this.findAll({ include: ['usuario'] });
  }

  async create(data) {
    const usuario = await Usuario.findByPk(data.usuario_id_usuario);
    if (!usuario) {
      throw new AppError(`Usuario ${data.usuario_id_usuario} no encontrado`, 404);
    }
    return await super.create(data);
  }
}

class VehiculoService extends BaseService {
  constructor() { 
    super(Vehiculo); 
  }

  async listarConDetalles() {
    return await this.findAll({ 
      include: [{
        association: 'conductor',
        include: ['persona']
      }] 
    });
  }

  async findByPlaca(placa) {
    return await this.model.findOne({ 
      where: { placa }, 
      include: [{
        association: 'conductor',
        include: ['persona']
      }] 
    });
  }

  async create(data) {
    const existe = await this.model.findOne({ where: { placa: data.placa } });
    if (existe) {
      throw new AppError(`Ya existe un vehículo con la placa ${data.placa}`, 400);
    }
    return await super.create(data);
  }

  async update(id, data) {
    const vehiculo = await this.findById(id);
    if (data.placa && data.placa !== vehiculo.placa) {
      const existe = await this.model.findOne({ where: { placa: data.placa } });
      if (existe) {
        throw new AppError(`Ya existe un vehículo con la placa ${data.placa}`, 400);
      }
    }
    return await vehiculo.update(data);
  }
}

export const supervisorService = new SupervisorService();
export const guardaService = new GuardaService();
export const personalService = new PersonalService();
export const vehiculoService = new VehiculoService();
