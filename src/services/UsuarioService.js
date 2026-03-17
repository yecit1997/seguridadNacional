import Usuario from '../models/Usuario.js';
import Persona from '../models/Persona.js';
import UsuarioRol from '../models/UsuarioRol.js';
import { BaseService } from './BaseService.js';
import { AppError } from '../middleware/response.js';
import sequelize from '../config/database.js';

class UsuarioService extends BaseService {
  constructor() {
    super(Usuario);
  }

  /**
   * Obtener lista de usuarios incluyendo datos de persona.
   */
  async listarConDetalles() {
    return await this.findAll({
      include: [{ model: Persona, as: 'persona' }]
    });
  }

  /**
   * Registro profesional: Crea Persona y Usuario en una sola transacción.
   */
  async registrarUsuario(userData, personaData, roles = []) {
    // 0. Validar unicidad de nombre de usuario (Paridad Spring)
    const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario: userData.nombre_usuario } });
    if (usuarioExistente) {
      throw new AppError(`El nombre de usuario '${userData.nombre_usuario}' ya está en uso`, 400);
    }

    const t = await sequelize.transaction();
    
    try {
      // 1. Crear o encontrar Persona
      let persona = await Persona.findOne({ where: { dni: personaData.dni }, transaction: t });
      if (!persona) {
        persona = await Persona.create(personaData, { transaction: t });
      }

      // 2. Crear Usuario
      const usuario = await Usuario.create({
        ...userData,
        persona_id_persona: persona.id_persona,
        status: true
      }, { transaction: t });

      // 3. Asignar Roles si existen
      if (roles.length > 0) {
        for (const roleId of roles) {
          await UsuarioRol.create({
            usuario_id_usuario: usuario.id_usuario,
            rol_id_rol: roleId
          }, { transaction: t });
        }
      }

      await t.commit();
      return usuario;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  /**
   * Asignar un rol a un usuario.
   */
  async asignarRol(idUsuario, idRol) {
    const usuario = await this.findById(idUsuario);
    const registro = await UsuarioRol.findOne({
      where: { usuario_id_usuario: idUsuario, rol_id_rol: idRol }
    });
    if (registro) {
      throw new AppError('El usuario ya tiene este rol asignado', 409);
    }
    return await UsuarioRol.create({
      usuario_id_usuario: usuario.id_usuario,
      rol_id_rol: idRol,
    });
  }

  /**
   * Cambiar estado de usuario.
   */
  async toggleStatus(id, status) {
    const usuario = await this.findById(id);
    return await usuario.update({ status });
  }
}

export default new UsuarioService();
