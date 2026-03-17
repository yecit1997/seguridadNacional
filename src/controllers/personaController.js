import personaService from '../services/PersonaService.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Personas
 */

export const listarTodos = async (req, res, next) => {
  try {
    const personas = await personaService.findAll();
    res.json(apiResponse.ok(personas));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const persona = await personaService.findById(req.params.id);
    res.json(apiResponse.ok(persona));
  } catch (e) { next(e); }
};

export const buscarPorDni = async (req, res, next) => {
  try {
    const persona = await personaService.findByDni(req.params.dni);
    res.json(apiResponse.ok(persona));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const persona = await personaService.create(req.body);
    res.status(201).json(apiResponse.created(persona));
  } catch (e) { next(e); }
};

export const actualizar = async (req, res, next) => {
  try {
    const persona = await personaService.update(req.params.id, req.body);
    res.json(apiResponse.ok(persona, 'Persona actualizada correctamente'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await personaService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Persona eliminada correctamente'));
  } catch (e) { next(e); }
};
