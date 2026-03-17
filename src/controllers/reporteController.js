import reporteService from '../services/ReporteService.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Reportes
 */

export const listarTodos = async (req, res, next) => {
  try {
    const data = await reporteService.listarConDetalles();
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const data = await reporteService.findById(req.params.id, {
      include: ['generador', 'tipo', 'status']
    });
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const listarPorUsuario = async (req, res, next) => {
  try {
    const data = await reporteService.listarConDetalles({
      usuario_id_usuario_generador: req.params.idUsuario
    });
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const listarPorTipo = async (req, res, next) => {
  try {
    const data = await reporteService.listarPorTipo(req.params.idTipo);
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const listarPorStatus = async (req, res, next) => {
  try {
    const data = await reporteService.listarPorStatus(req.params.idStatus);
    res.json(apiResponse.ok(data));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const data = await reporteService.crearReporte(req.body);
    res.status(201).json(apiResponse.created(data));
  } catch (e) { next(e); }
};

export const actualizarStatus = async (req, res, next) => {
  try {
    const { id, idStatus } = req.params;
    const data = await reporteService.actualizarStatus(id, idStatus);
    res.json(apiResponse.ok(data, 'Estado del reporte actualizado exitosamente'));
  } catch (e) { next(e); }
};

export const actualizar = async (req, res, next) => {
  try {
    const data = await reporteService.update(req.params.id, req.body);
    res.json(apiResponse.ok(data, 'Reporte actualizado exitosamente'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await reporteService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Reporte eliminado correctamente'));
  } catch (e) { next(e); }
};
