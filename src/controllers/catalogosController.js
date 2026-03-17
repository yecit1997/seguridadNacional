import { catalogosService } from '../services/CatalogosService.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Catálogos (Tipos y Status de reportes)
 */

export const listarTipos = async (req, res, next) => {
  try {
    const data = await catalogosService.listarTipos();
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarTipoPorId = async (req, res, next) => {
  try {
    const data = await catalogosService.buscarTipoPorId(req.params.id);
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crearTipo = async (req, res, next) => {
  try {
    const data = await catalogosService.crearTipo(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const actualizarTipo = async (req, res, next) => {
  try {
    const data = await catalogosService.actualizarTipo(req.params.id, req.body);
    res.json(apiResponse.ok(data, 'Tipo de reporte actualizado'));
  } catch (e) { next(e); }
};

export const eliminarTipo = async (req, res, next) => {
  try {
    await catalogosService.eliminarTipo(req.params.id);
    res.json(apiResponse.ok(null, 'Tipo de reporte eliminado'));
  } catch (e) { next(e); }
};

export const listarStatus = async (req, res, next) => {
  try {
    const data = await catalogosService.listarStatus();
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarStatusPorId = async (req, res, next) => {
  try {
    const data = await catalogosService.buscarStatusPorId(req.params.id);
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crearStatus = async (req, res, next) => {
  try {
    const data = await catalogosService.crearStatus(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const actualizarStatus = async (req, res, next) => {
  try {
    const data = await catalogosService.actualizarStatus(req.params.id, req.body);
    res.json(apiResponse.ok(data, 'Estado de reporte actualizado'));
  } catch (e) { next(e); }
};

export const eliminarStatus = async (req, res, next) => {
  try {
    await catalogosService.eliminarStatus(req.params.id);
    res.json(apiResponse.ok(null, 'Estado de reporte eliminado'));
  } catch (e) { next(e); }
};
