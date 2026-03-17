import { rolService } from '../services/CatalogosService.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Roles
 */

export const listarTodos = async (req, res, next) => {
  try {
    const data = await rolService.findAll();
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const data = await rolService.findById(req.params.id);
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const data = await rolService.create(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const actualizar = async (req, res, next) => {
  try {
    const data = await rolService.update(req.params.id, req.body);
    res.json(apiResponse.ok(data, 'Rol actualizado correctamente'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await rolService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Rol eliminado correctamente'));
  } catch (e) { next(e); }
};
