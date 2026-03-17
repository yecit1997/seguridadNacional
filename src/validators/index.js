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
  body('usuario.nombre_usuario').notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('usuario.contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('persona.dni').notEmpty().withMessage('El DNI de la persona es obligatorio'),
  body('roles').optional().isArray().withMessage('Roles debe ser un arreglo'),
  validate
];

/**
 * Validaciones para Reporte
 */
export const reporteValidator = [
  body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
  body('usuario_id_usuario_generador').notEmpty().withMessage('ID de generador obligatorio'),
  body('tipo_reporte_id_tipo_reporte').notEmpty().withMessage('ID de tipo obligatorio'),
  validate
];
