import Supervisor from '../models/Supervisor.js';
import Guarda from '../models/Guarda.js';
import PersonalAdministrativo from '../models/PersonalAdministrativo.js';
import Vehiculo from '../models/Vehiculo.js';
import Usuario from '../models/Usuario.js';
import Persona from '../models/Persona.js';
import Conductor from '../models/Conductor.js';
import { BaseService } from './BaseService.js';
import { AppError } from '../middleware/response.js';

class SupervisorService extends BaseService {
  constructor() { 
    super(Supervisor); 
  }
  
  async listarConDetalles() {
    return await this.findAll({ 
      include: [{
        model: Usuario,
        as: 'usuario',
        include: [{ model: Persona, as: 'persona' }]
      }]
    });
  }

  async create(data) {
    const usuario = await Usuario.findByPk(data.usuario_id_usuario);
    if (!usuario) {
      throw new AppError(`Usuario ${data.usuario_id_usuario} no encontrado`, 404);
    }
    
    const existeEnSupervisor = await this.model.findByPk(data.usuario_id_usuario);
    if (existeEnSupervisor) {
      throw new AppError(`El usuario ${data.usuario_id_usuario} ya es supervisor`, 400);
    }
    
    const existeEnGuarda = await Guarda.findByPk(data.usuario_id_usuario);
    if (existeEnGuarda) {
      throw new AppError(`El usuario ${data.usuario_id_usuario} ya es un guarda`, 400);
    }
    
    const existeEnPersonal = await PersonalAdministrativo.findByPk(data.usuario_id_usuario);
    if (existeEnPersonal) {
      throw new AppError(`El usuario ${data.usuario_id_usuario} ya es personal administrativo`, 400);
    }
    
    return await super.create(data);
  }
}

class GuardaService extends BaseService {
  constructor() { 
    super(Guarda); 
  }

  async listarConDetalles() {
    return await this.findAll({ 
      include: [
        {
          model: Usuario,
          as: 'usuario',
          include: [{ model: Persona, as: 'persona' }]
        },
        {
          model: Supervisor,
          as: 'supervisor',
          include: [{
            model: Usuario,
            as: 'usuario',
            include: [{ model: Persona, as: 'persona' }]
          }]
        }
      ]
    });
  }

  async listarPorSupervisor(supervisorId) {
    return await this.findAll({
      where: { supervisor_id_supervisor: supervisorId },
      include: [{
        model: Usuario,
        as: 'usuario',
        include: [{ model: Persona, as: 'persona' }]
      }]
    });
  }

  async create(data) {
    const usuario = await Usuario.findByPk(data.usuario_id_usuario);
    if (!usuario) {
      throw new AppError(`Usuario ${data.usuario_id_usuario} no encontrado`, 404);
    }
    
    const existeEnGuarda = await this.model.findByPk(data.usuario_id_usuario);
    if (existeEnGuarda) {
      throw new AppError(`El usuario ${data.usuario_id_usuario} ya es un guarda`, 400);
    }
    
    const existeEnSupervisor = await Supervisor.findByPk(data.usuario_id_usuario);
    if (existeEnSupervisor) {
      throw new AppError(`El usuario ${data.usuario_id_usuario} ya es supervisor`, 400);
    }
    
    const existeEnPersonal = await PersonalAdministrativo.findByPk(data.usuario_id_usuario);
    if (existeEnPersonal) {
      throw new AppError(`El usuario ${data.usuario_id_usuario} ya es personal administrativo`, 400);
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
    return await this.findAll({ 
      include: [{
        model: Usuario,
        as: 'usuario',
        include: [{ model: Persona, as: 'persona' }]
      }]
    });
  }

  async create(data) {
    const usuario = await Usuario.findByPk(data.usuario_id_usuario);
    if (!usuario) {
      throw new AppError(`Usuario ${data.usuario_id_usuario} no encontrado`, 404);
    }
    
    const existe = await this.model.findByPk(data.usuario_id_usuario);
    if (existe) {
      throw new AppError(`El usuario ${data.usuario_id_usuario} ya es personal administrativo`, 400);
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
