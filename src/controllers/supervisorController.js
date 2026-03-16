const Supervisor = require('../models/Supervisor');
const UsuarioRol = require('../models/UsuarioRol');
const { apiResponse, AppError } = require('../middleware/response');

const include = [{ model: UsuarioRol, as: 'usuarioRol' }];

exports.listarTodos = async (req, res, next) => {
  try { res.json(apiResponse.ok(await Supervisor.findAll({ include }))); }
  catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const s = await Supervisor.findByPk(req.params.id, { include });
    if (!s) throw new AppError('Supervisor no encontrado', 404);
    res.json(apiResponse.ok(s));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const { usuario_rol_id_usuario_rol, fecha_ascenso } = req.body;
    const ur = await UsuarioRol.findByPk(usuario_rol_id_usuario_rol);
    if (!ur) throw new AppError('UsuarioRol no encontrado', 404);
    const s = await Supervisor.create({ usuario_rol_id_usuario_rol, fecha_ascenso });
    res.status(201).json(apiResponse.created(s));
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const s = await Supervisor.findByPk(req.params.id);
    if (!s) throw new AppError('Supervisor no encontrado', 404);
    await s.update({ fecha_ascenso: req.body.fecha_ascenso });
    res.json(apiResponse.ok(s, 'Actualizado'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const s = await Supervisor.findByPk(req.params.id);
    if (!s) throw new AppError('Supervisor no encontrado', 404);
    await s.destroy();
    res.json(apiResponse.noContent('Supervisor eliminado'));
  } catch (e) { next(e); }
};
