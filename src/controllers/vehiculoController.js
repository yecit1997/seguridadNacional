import { vehiculoService } from '../services/SpecializedServices.js';
import { apiResponse, AppError } from '../middleware/response.js';

/**
 * Controlador de Vehículos
 */

export const listarTodos = async (req, res, next) => {
  try {
    const data = await vehiculoService.listarConDetalles();
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const data = await vehiculoService.findById(req.params.id, { include: ['conductor'] });
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarPorPlaca = async (req, res, next) => {
  try {
    const data = await vehiculoService.findByPlaca(req.params.placa);
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const data = await vehiculoService.create(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const actualizar = async (req, res, next) => {
  try {
    const data = await vehiculoService.update(req.params.id, req.body);
    res.json(apiResponse.ok(data, 'Actualizado'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await vehiculoService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Vehículo eliminado correctamente'));
  } catch (e) { next(e); }
};
