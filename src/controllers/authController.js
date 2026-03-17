import authService from '../services/AuthService.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador para la autenticación de usuarios.
 */
export const login = async (req, res, next) => {
  try {
    const { nombre_usuario, contrasena } = req.body;
    
    if (!nombre_usuario || !contrasena) {
      return res.status(400).json(apiResponse.error('Usuario y contraseña son requeridos'));
    }

    const { usuario, token } = await authService.login(nombre_usuario, contrasena);

    res.json(apiResponse.ok({ usuario, token }, 'Login exitoso'));
  } catch (error) {
    next(error);
  }
};
