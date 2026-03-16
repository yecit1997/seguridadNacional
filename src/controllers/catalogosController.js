const { TipoReporte, StatusReporte } = require('../models/Catalogos');
const { apiResponse, AppError } = require('../middleware/response');

// ─── TipoReporte ──────────────────────────────────────────────
exports.tipoReporte = {
  listarTodos: async (req, res, next) => {
    try { res.json(apiResponse.ok(await TipoReporte.findAll())); } catch (e) { next(e); }
  },
  buscarPorId: async (req, res, next) => {
    try {
      const t = await TipoReporte.findByPk(req.params.id);
      if (!t) throw new AppError('TipoReporte no encontrado', 404);
      res.json(apiResponse.ok(t));
    } catch (e) { next(e); }
  },
  crear: async (req, res, next) => {
    try { res.status(201).json(apiResponse.created(await TipoReporte.create(req.body))); }
    catch (e) { next(e); }
  },
  actualizar: async (req, res, next) => {
    try {
      const t = await TipoReporte.findByPk(req.params.id);
      if (!t) throw new AppError('TipoReporte no encontrado', 404);
      await t.update(req.body);
      res.json(apiResponse.ok(t, 'Actualizado'));
    } catch (e) { next(e); }
  },
  eliminar: async (req, res, next) => {
    try {
      const t = await TipoReporte.findByPk(req.params.id);
      if (!t) throw new AppError('TipoReporte no encontrado', 404);
      await t.destroy();
      res.json(apiResponse.noContent('TipoReporte eliminado'));
    } catch (e) { next(e); }
  },
};

// ─── StatusReporte ────────────────────────────────────────────
exports.statusReporte = {
  listarTodos: async (req, res, next) => {
    try { res.json(apiResponse.ok(await StatusReporte.findAll())); } catch (e) { next(e); }
  },
  buscarPorId: async (req, res, next) => {
    try {
      const s = await StatusReporte.findByPk(req.params.id);
      if (!s) throw new AppError('StatusReporte no encontrado', 404);
      res.json(apiResponse.ok(s));
    } catch (e) { next(e); }
  },
  crear: async (req, res, next) => {
    try { res.status(201).json(apiResponse.created(await StatusReporte.create(req.body))); }
    catch (e) { next(e); }
  },
  actualizar: async (req, res, next) => {
    try {
      const s = await StatusReporte.findByPk(req.params.id);
      if (!s) throw new AppError('StatusReporte no encontrado', 404);
      await s.update(req.body);
      res.json(apiResponse.ok(s, 'Actualizado'));
    } catch (e) { next(e); }
  },
  eliminar: async (req, res, next) => {
    try {
      const s = await StatusReporte.findByPk(req.params.id);
      if (!s) throw new AppError('StatusReporte no encontrado', 404);
      await s.destroy();
      res.json(apiResponse.noContent('StatusReporte eliminado'));
    } catch (e) { next(e); }
  },
};
