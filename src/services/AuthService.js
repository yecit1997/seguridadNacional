import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { AppError } from '../middleware/response.js';

/**
 * Servicio para la gestión de autenticación y seguridad.
 */
class AuthService {
  /**
   * Valida las credenciales del usuario y genera un token JWT.
   * @param {string} nombre_usuario 
   * @param {string} contrasena 
   * @returns {Object} { usuario, token }
   */
  async login(nombre_usuario, contrasena) {
    // Buscar usuario con contraseña incluida (scope withPassword)
    const usuario = await Usuario.scope('withPassword').findOne({
      where: { nombre_usuario }
    });

    if (!usuario) {
      throw new AppError('Credenciales inválidas', 401);
    }

    if (!usuario.status) {
      throw new AppError('Cuenta deshabilitada', 403);
    }

    const passwordValido = await usuario.validarContrasena(contrasena);
    if (!passwordValido) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Generar Token
    const token = this.generarToken(usuario);

    // Quitar contraseña del objeto de retorno
    const usuarioData = usuario.toJSON();
    delete usuarioData.contrasena;

    return {
      usuario: usuarioData,
      token
    };
  }

  /**
   * Genera un JWT para un usuario.
   */
  generarToken(usuario) {
    return jwt.sign(
      { 
        id: usuario.id_usuario, 
        username: usuario.nombre_usuario 
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
  }
}

export default new AuthService();
