import alertaService from '../services/AlertaService.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Alertas
 */

export const listarPorUsuario = async (req, res, next) => {
  try {
    const data = await alertaService.listarPorUsuario(req.params.idUsuario);
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const listarNoLeidas = async (req, res, next) => {
  try {
    const data = await alertaService.listarNoLeidas(req.params.idUsuario);
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const data = await alertaService.findById(req.params.id, { include: ['reporte'] });
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const data = await alertaService.create(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const marcarLeida = async (req, res, next) => {
  try {
    const data = await alertaService.marcarComoLeida(req.params.id);
    res.json(apiResponse.ok(data, 'Alerta marcada como leída'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await alertaService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Alerta eliminada correctamente'));
  } catch (e) { next(e); }
};
