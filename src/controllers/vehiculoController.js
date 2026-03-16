const Vehiculo = require('../models/Vehiculo');
const Conductor = require('../models/Conductor');
const Persona = require('../models/Persona');
const { apiResponse, AppError } = require('../middleware/response');

const include = [{ model: Conductor, as: 'conductor', include: [{ model: Persona, as: 'persona' }] }];

exports.listarTodos = async (req, res, next) => {
  try { res.json(apiResponse.ok(await Vehiculo.findAll({ include }))); }
  catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const v = await Vehiculo.findByPk(req.params.id, { include });
    if (!v) throw new AppError('Vehículo no encontrado', 404);
    res.json(apiResponse.ok(v));
  } catch (e) { next(e); }
};

exports.buscarPorPlaca = async (req, res, next) => {
  try {
    const v = await Vehiculo.findOne({ where: { placa: req.params.placa }, include });
    if (!v) throw new AppError('Vehículo no encontrado', 404);
    res.json(apiResponse.ok(v));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const { placa, conductor_id_fk_persona } = req.body;
    const v = await Vehiculo.create({ placa, conductor_id_fk_persona });
    res.status(201).json(apiResponse.created(v));
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const v = await Vehiculo.findByPk(req.params.id);
    if (!v) throw new AppError('Vehículo no encontrado', 404);
    await v.update(req.body);
    res.json(apiResponse.ok(v, 'Actualizado'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const v = await Vehiculo.findByPk(req.params.id);
    if (!v) throw new AppError('Vehículo no encontrado', 404);
    await v.destroy();
    res.json(apiResponse.noContent('Vehículo eliminado'));
  } catch (e) { next(e); }
};
