const PersonalAdministrativo = require('../models/PersonalAdministrativo');
const UsuarioRol = require('../models/UsuarioRol');
const { apiResponse, AppError } = require('../middleware/response');

const include = [{ model: UsuarioRol, as: 'usuarioRol' }];

exports.listarTodos = async (req, res, next) => {
  try { res.json(apiResponse.ok(await PersonalAdministrativo.findAll({ include }))); }
  catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const p = await PersonalAdministrativo.findByPk(req.params.id, { include });
    if (!p) throw new AppError('Personal no encontrado', 404);
    res.json(apiResponse.ok(p));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const { usuario_rol_id_usuario_rol, cargo } = req.body;
    const ur = await UsuarioRol.findByPk(usuario_rol_id_usuario_rol);
    if (!ur) throw new AppError('UsuarioRol no encontrado', 404);
    const p = await PersonalAdministrativo.create({ usuario_rol_id_usuario_rol, cargo });
    res.status(201).json(apiResponse.created(p));
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const p = await PersonalAdministrativo.findByPk(req.params.id);
    if (!p) throw new AppError('Personal no encontrado', 404);
    await p.update({ cargo: req.body.cargo });
    res.json(apiResponse.ok(p, 'Actualizado'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const p = await PersonalAdministrativo.findByPk(req.params.id);
    if (!p) throw new AppError('Personal no encontrado', 404);
    await p.destroy();
    res.json(apiResponse.noContent('Personal eliminado'));
  } catch (e) { next(e); }
};
