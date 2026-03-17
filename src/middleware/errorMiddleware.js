import { apiResponse, AppError } from './response.js';

/**
 * Middleware para manejar rutas no encontradas (404).
 */
export const notFound = (req, res, next) => {
  res.status(404).json(apiResponse.error(`Recurso no encontrado: ${req.originalUrl}`));
};

/**
 * Manejador global de errores. 
 * Captura errores de Sequelize y errores personalizados del sistema.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log detallado en desarrollo
  if (process.env.NODE_ENV !== 'production') {
    console.error(' [Error Log]:', err);
  }

  // Errores específicos de Sequelize
  if (err.name === 'SequelizeValidationError') {
    const fields = {};
    err.errors.forEach(e => { fields[e.path] = e.message; });
    return res.status(400).json({
      success: false,
      message: 'Error de validación de datos',
      errors: fields
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json(apiResponse.error('Ya existe un registro con estos datos únicos'));
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json(apiResponse.error('Error de integridad: Referencia inexistente'));
  }

  // Respuesta estándar de error
  res.status(statusCode).json(apiResponse.error(
    err.message || 'Ocurrió un error inesperado en el servidor'
  ));
};
