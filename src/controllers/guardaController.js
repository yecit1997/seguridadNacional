import { guardaService } from '../services/SpecializedServices.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Guardas
 */

export const listarTodos = async (req, res, next) => {
  try {
    const data = await guardaService.listarConDetalles();
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const listarPorSupervisor = async (req, res, next) => {
  try {
    const data = await guardaService.listarPorSupervisor(req.params.supervisorId);
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const data = await guardaService.findById(req.params.id, { include: ['usuario', 'supervisor'] });
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const data = await guardaService.create(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const actualizar = async (req, res, next) => {
  try {
    const data = await guardaService.update(req.params.id, req.body);
    res.json(apiResponse.ok(data, 'Guarda actualizado exitosamente'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await guardaService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Guarda eliminado correctamente'));
  } catch (e) { next(e); }
};
