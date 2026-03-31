import { body, param, validationResult } from 'express-validator';
import { apiResponse } from '../middleware/response.js';

/**
 * Middleware para capturar errores de validación.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json(apiResponse.error('Errores de validación', errors.array()));
};

/**
 * Validaciones para Persona
 */
export const personaValidator = [
  body('dni').notEmpty().withMessage('El DNI es obligatorio').isNumeric().withMessage('El DNI debe ser numérico'),
  body('nombre').notEmpty().withMessage('El nombre es obligatorio').isString(),
  body('apellido').notEmpty().withMessage('El apellido es obligatorio').isString(),
  body('correo').optional().isEmail().withMessage('Correo electrónico inválido'),
  body('telefono').optional().isString(),
  validate
];

/**
 * Validaciones para Usuario
 */
export const usuarioValidator = [
  body().custom((value, { req }) => {
    const data = req.body;
    
    // Formato anidado (original): usuario.nombre_usuario, persona.dni
    // Formato plano (frontend): nombre_usuario, persona_id_persona
    
    const hasNestedFormat = data.usuario && data.usuario.nombre_usuario && data.persona && data.persona.dni;
    const hasFlatFormat = data.nombre_usuario && data.contrasena && data.persona_id_persona;
    
    if (!hasNestedFormat && !hasFlatFormat) {
      throw new Error('Datos de usuario inválidos. Use formato anidado (usuario, persona) o plano (nombre_usuario, contrasena, persona_id_persona)');
    }
    
    if (hasFlatFormat && data.contrasena && data.contrasena.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    
    if (hasNestedFormat && data.usuario && data.usuario.contrasena && data.usuario.contrasena.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    
    return true;
  }),
  validate
];

/**
 * Validaciones para Reporte
 */
export const reporteValidator = [
  body('entrada_salida').notEmpty().withMessage('Debe especificar Entrada o Salida'),
  body().custom((value) => {
    const hasUser = value.usuario_id_usuario_generador || value.idUsuario;
    const hasType = value.tipo_reporte_id_tipo_reporte || value.idTipo;
    if (!hasUser || !hasType) {
      throw new Error('Datos de usuario generador o tipo de reporte incompletos');
    }
    
    // Validar que sea o para vehículo o para personal
    const isVehiculo = value.placa || value.vehiculo_id_vehiculo || value.idVehiculo;
    const isPersonal = value.persona_id_persona || value.idPersona;
    
    if (!isVehiculo && !isPersonal) {
      throw new Error('El reporte debe estar asociado a un vehículo o a una persona');
    }
    return true;
  }),
  validate
];
