const Reporte = require('../models/Reporte');
const Usuario = require('../models/Usuario');
const { TipoReporte, StatusReporte } = require('../models/Catalogos');
const { apiResponse, AppError } = require('../middleware/response');

const include = [
  { model: Usuario,       as: 'usuarioGenerador' },
  { model: TipoReporte,   as: 'tipoReporte'      },
  { model: StatusReporte, as: 'statusReporte'     },
];

exports.listarTodos = async (req, res, next) => {
  try { res.json(apiResponse.ok(await Reporte.findAll({ include }))); }
  catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const r = await Reporte.findByPk(req.params.id, { include });
    if (!r) throw new AppError('Reporte no encontrado', 404);
    res.json(apiResponse.ok(r));
  } catch (e) { next(e); }
};

exports.listarPorUsuario = async (req, res, next) => {
  try {
    res.json(apiResponse.ok(await Reporte.findAll({
      where: { usuario_id_usuario_generador: req.params.idUsuario }, include,
    })));
  } catch (e) { next(e); }
};

exports.listarPorTipo = async (req, res, next) => {
  try {
    res.json(apiResponse.ok(await Reporte.findAll({
      where: { tipo_reporte_id_tipo_reporte: req.params.idTipo }, include,
    })));
  } catch (e) { next(e); }
};

exports.listarPorStatus = async (req, res, next) => {
  try {
    res.json(apiResponse.ok(await Reporte.findAll({
      where: { status_reporte_id_status_reporte: req.params.idStatus }, include,
    })));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const { descripcion, usuario_id_usuario_generador, tipo_reporte_id_tipo_reporte, status_reporte_id_status_reporte } = req.body;
    const r = await Reporte.create({
      fecha_creacion: new Date(),
      descripcion,
      usuario_id_usuario_generador,
      tipo_reporte_id_tipo_reporte,
      status_reporte_id_status_reporte,
    });
    res.status(201).json(apiResponse.created(r));
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const r = await Reporte.findByPk(req.params.id);
    if (!r) throw new AppError('Reporte no encontrado', 404);
    await r.update(req.body);
    res.json(apiResponse.ok(r, 'Actualizado'));
  } catch (e) { next(e); }
};

exports.actualizarStatus = async (req, res, next) => {
  try {
    const r = await Reporte.findByPk(req.params.id);
    if (!r) throw new AppError('Reporte no encontrado', 404);
    const status = await StatusReporte.findByPk(req.params.idStatus);
    if (!status) throw new AppError('StatusReporte no encontrado', 404);
    await r.update({ status_reporte_id_status_reporte: req.params.idStatus });
    res.json(apiResponse.ok(r, 'Status actualizado'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const r = await Reporte.findByPk(req.params.id);
    if (!r) throw new AppError('Reporte no encontrado', 404);
    await r.destroy();
    res.json(apiResponse.noContent('Reporte eliminado'));
  } catch (e) { next(e); }
};
