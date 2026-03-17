import jwt from 'jsonwebtoken';
import { apiResponse } from './response.js';

/**
 * Middleware para proteger rutas mediante JWT.
 * Verifica la validez del token y añade el usuario a la petición.
 */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(apiResponse.error('No autorizado - Token no proporcionado', null));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(apiResponse.error('Sesión inválida o expirada', null));
  }
};
