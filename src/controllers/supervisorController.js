import { supervisorService } from '../services/SpecializedServices.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Supervisores
 */

export const listarTodos = async (req, res, next) => {
  try {
    const data = await supervisorService.listarConDetalles();
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const data = await supervisorService.findById(req.params.id, { include: ['usuario'] });
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const data = await supervisorService.create(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const actualizar = async (req, res, next) => {
  try {
    const data = await supervisorService.update(req.params.id, req.body);
    res.json(apiResponse.ok(data, 'Supervisor actualizado exitosamente'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await supervisorService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Supervisor eliminado correctamente'));
  } catch (e) { next(e); }
};
