const Conductor = require('../models/Conductor');
const Persona = require('../models/Persona');
const { apiResponse, AppError } = require('../middleware/response');

const include = [{ model: Persona, as: 'persona' }];

exports.listarTodos = async (req, res, next) => {
  try { res.json(apiResponse.ok(await Conductor.findAll({ include }))); }
  catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const c = await Conductor.findByPk(req.params.id, { include });
    if (!c) throw new AppError('Conductor no encontrado', 404);
    res.json(apiResponse.ok(c));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const { id_fk_persona, licencia } = req.body;
    const persona = await Persona.findByPk(id_fk_persona);
    if (!persona) throw new AppError('Persona no encontrada', 404);
    const c = await Conductor.create({ id_fk_persona, licencia });
    res.status(201).json(apiResponse.created(c));
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const c = await Conductor.findByPk(req.params.id);
    if (!c) throw new AppError('Conductor no encontrado', 404);
    await c.update({ licencia: req.body.licencia });
    res.json(apiResponse.ok(c, 'Actualizado'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const c = await Conductor.findByPk(req.params.id);
    if (!c) throw new AppError('Conductor no encontrado', 404);
    await c.destroy();
    res.json(apiResponse.noContent('Conductor eliminado'));
  } catch (e) { next(e); }
};
