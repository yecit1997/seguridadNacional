/**
 * Utilidades para estandarizar las respuestas de la API.
 */
export const apiResponse = {
  /**
   * Respuesta exitosa (200 OK)
   */
  ok: (data, message = 'Operación exitosa') => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  }),

  /**
   * Recurso creado (201 Created)
   */
  created: (data, message = 'Recurso creado exitosamente') => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  }),

  /**
   * Error general
   */
  error: (message, data = null) => ({
    success: false,
    message,
    data,
    timestamp: new Date().toISOString(),
  }),
};

/**
 * Clase base para errores operacionales de la aplicación.
 */
export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
