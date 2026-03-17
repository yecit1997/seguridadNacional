import { personalService } from '../services/SpecializedServices.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Personal Administrativo
 */

export const listarTodos = async (req, res, next) => {
  try {
    const data = await personalService.listarConDetalles();
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const data = await personalService.findById(req.params.id, { include: ['usuario'] });
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const data = await personalService.create(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const actualizar = async (req, res, next) => {
  try {
    const data = await personalService.update(req.params.id, req.body);
    res.json(apiResponse.ok(data, 'Personal administrativo actualizado exitosamente'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await personalService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Personal administrativo eliminado correctamente'));
  } catch (e) { next(e); }
};
