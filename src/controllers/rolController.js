const Rol = require('../models/Rol');
const { apiResponse, AppError } = require('../middleware/response');

exports.listarTodos = async (req, res, next) => {
  try { res.json(apiResponse.ok(await Rol.findAll())); }
  catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) throw new AppError('Rol no encontrado', 404);
    res.json(apiResponse.ok(rol));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(201).json(apiResponse.created(rol));
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) throw new AppError('Rol no encontrado', 404);
    await rol.update(req.body);
    res.json(apiResponse.ok(rol, 'Actualizado'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) throw new AppError('Rol no encontrado', 404);
    await rol.destroy();
    res.json(apiResponse.noContent('Rol eliminado'));
  } catch (e) { next(e); }
};
