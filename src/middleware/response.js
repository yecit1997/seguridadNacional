// Respuesta estándar
const apiResponse = {
  ok: (data, message = null) => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  }),
  created: (data) => ({
    success: true,
    message: 'Creado exitosamente',
    data,
    timestamp: new Date().toISOString(),
  }),
  noContent: (message) => ({
    success: true,
    message,
    data: null,
    timestamp: new Date().toISOString(),
  }),
  error: (message) => ({
    success: false,
    message,
    data: null,
    timestamp: new Date().toISOString(),
  }),
};

// Manejador de errores global
const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'SequelizeValidationError') {
    const errors = {};
    err.errors.forEach((e) => { errors[e.path] = e.message; });
    return res.status(400).json({ success: false, message: 'Error de validación', data: errors });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json(apiResponse.error('Ya existe un registro con ese valor único'));
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json(apiResponse.error('Referencia a un registro que no existe'));
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json(apiResponse.error(err.message));
  }

  res.status(500).json(apiResponse.error('Error interno del servidor: ' + err.message));
};

// Error 404
const notFound = (req, res) => {
  res.status(404).json(apiResponse.error(`Ruta ${req.originalUrl} no encontrada`));
};

// Error personalizado
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = { apiResponse, errorHandler, notFound, AppError };
