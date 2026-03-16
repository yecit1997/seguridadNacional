const Persona = require('../models/Persona');
const { apiResponse, AppError } = require('../middleware/response');

exports.listarTodos = async (req, res, next) => {
  try {
    const personas = await Persona.findAll();
    res.json(apiResponse.ok(personas));
  } catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const persona = await Persona.findByPk(req.params.id);
    if (!persona) throw new AppError('Persona no encontrada', 404);
    res.json(apiResponse.ok(persona));
  } catch (e) { next(e); }
};

exports.buscarPorDni = async (req, res, next) => {
  try {
    const persona = await Persona.findOne({ where: { dni: req.params.dni } });
    if (!persona) throw new AppError('Persona no encontrada', 404);
    res.json(apiResponse.ok(persona));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const persona = await Persona.create(req.body);
    res.status(201).json(apiResponse.created(persona));
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const persona = await Persona.findByPk(req.params.id);
    if (!persona) throw new AppError('Persona no encontrada', 404);
    await persona.update(req.body);
    res.json(apiResponse.ok(persona, 'Actualizado'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const persona = await Persona.findByPk(req.params.id);
    if (!persona) throw new AppError('Persona no encontrada', 404);
    await persona.destroy();
    res.json(apiResponse.noContent('Persona eliminada'));
  } catch (e) { next(e); }
};
