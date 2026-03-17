import conductorService from '../services/ConductorService.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Conductores
 */

export const listarTodos = async (req, res, next) => {
  try {
    const data = await conductorService.listarConDetalles();
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const data = await conductorService.findById(req.params.id, { include: ['persona'] });
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const data = await conductorService.create(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const actualizar = async (req, res, next) => {
  try {
    const data = await conductorService.update(req.params.id, req.body);
    res.json(apiResponse.ok(data, 'Conductor actualizado exitosamente'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await conductorService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Conductor eliminado correctamente'));
  } catch (e) { next(e); }
};
