const Alerta = require('../models/Alerta');
const Usuario = require('../models/Usuario');
const Reporte = require('../models/Reporte');
const { apiResponse, AppError } = require('../middleware/response');

const include = [
  { model: Usuario, as: 'usuarioDestinatario' },
  { model: Reporte, as: 'reporte'             },
];

exports.listarPorUsuario = async (req, res, next) => {
  try {
    res.json(apiResponse.ok(await Alerta.findAll({
      where: { usuario_id_usuario_destinatario: req.params.idUsuario }, include,
    })));
  } catch (e) { next(e); }
};

exports.listarNoLeidas = async (req, res, next) => {
  try {
    res.json(apiResponse.ok(await Alerta.findAll({
      where: { usuario_id_usuario_destinatario: req.params.idUsuario, leida: 0 }, include,
    })));
  } catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const a = await Alerta.findByPk(req.params.id, { include });
    if (!a) throw new AppError('Alerta no encontrada', 404);
    res.json(apiResponse.ok(a));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const { mensaje, usuario_id_usuario_destinatario, reporte_id_reporte } = req.body;
    const a = await Alerta.create({
      fecha_hora: new Date(),
      mensaje,
      leida: 0,
      usuario_id_usuario_destinatario,
      reporte_id_reporte,
    });
    res.status(201).json(apiResponse.created(a));
  } catch (e) { next(e); }
};

exports.marcarLeida = async (req, res, next) => {
  try {
    const a = await Alerta.findByPk(req.params.id);
    if (!a) throw new AppError('Alerta no encontrada', 404);
    await a.update({ leida: 1 });
    res.json(apiResponse.ok(a, 'Alerta marcada como leída'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const a = await Alerta.findByPk(req.params.id);
    if (!a) throw new AppError('Alerta no encontrada', 404);
    await a.destroy();
    res.json(apiResponse.noContent('Alerta eliminada'));
  } catch (e) { next(e); }
};
