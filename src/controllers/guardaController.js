const Guarda = require('../models/Guarda');
const Supervisor = require('../models/Supervisor');
const UsuarioRol = require('../models/UsuarioRol');
const { apiResponse, AppError } = require('../middleware/response');

const include = [
  { model: UsuarioRol, as: 'usuarioRol' },
  { model: Supervisor, as: 'supervisor' },
];

exports.listarTodos = async (req, res, next) => {
  try { res.json(apiResponse.ok(await Guarda.findAll({ include }))); }
  catch (e) { next(e); }
};

exports.listarPorSupervisor = async (req, res, next) => {
  try {
    const guardas = await Guarda.findAll({
      where: { supervisor_id_supervisor: req.params.supervisorId },
      include,
    });
    res.json(apiResponse.ok(guardas));
  } catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const g = await Guarda.findByPk(req.params.id, { include });
    if (!g) throw new AppError('Guarda no encontrado', 404);
    res.json(apiResponse.ok(g));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const { usuario_rol_id_usuario_rol, areaAsignada, supervisor_id_supervisor } = req.body;
    const ur = await UsuarioRol.findByPk(usuario_rol_id_usuario_rol);
    if (!ur) throw new AppError('UsuarioRol no encontrado', 404);
    const g = await Guarda.create({ usuario_rol_id_usuario_rol, areaAsignada, supervisor_id_supervisor });
    res.status(201).json(apiResponse.created(g));
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const g = await Guarda.findByPk(req.params.id);
    if (!g) throw new AppError('Guarda no encontrado', 404);
    await g.update(req.body);
    res.json(apiResponse.ok(g, 'Actualizado'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const g = await Guarda.findByPk(req.params.id);
    if (!g) throw new AppError('Guarda no encontrado', 404);
    await g.destroy();
    res.json(apiResponse.noContent('Guarda eliminado'));
  } catch (e) { next(e); }
};
