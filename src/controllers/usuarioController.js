const Usuario = require('../models/Usuario');
const UsuarioRol = require('../models/UsuarioRol');
const Persona = require('../models/Persona');
const Rol = require('../models/Rol');
const { apiResponse, AppError } = require('../middleware/response');

exports.listarTodos = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({ include: [{ model: Persona, as: 'persona' }] });
    res.json(apiResponse.ok(usuarios));
  } catch (e) { next(e); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const u = await Usuario.findByPk(req.params.id, { include: [{ model: Persona, as: 'persona' }] });
    if (!u) throw new AppError('Usuario no encontrado', 404);
    res.json(apiResponse.ok(u));
  } catch (e) { next(e); }
};

exports.crear = async (req, res, next) => {
  try {
    const { nombre_usuario, contrasena, persona_id_persona, rol_id } = req.body;
    const existe = await Usuario.findOne({ where: { nombre_usuario } });
    if (existe) throw new AppError('El nombre de usuario ya está en uso', 409);
    const persona = await Persona.findByPk(persona_id_persona);
    if (!persona) throw new AppError('Persona no encontrada', 404);
    const usuario = await Usuario.create({ nombre_usuario, contrasena, status: 1, persona_id_persona });
    if (rol_id) {
      const rol = await Rol.findByPk(rol_id);
      if (!rol) throw new AppError('Rol no encontrado', 404);
      await UsuarioRol.create({ usuario_id_usuario: usuario.id_usuario, rol_id_rol: rol_id });
    }
    res.status(201).json(apiResponse.created(usuario));
  } catch (e) { next(e); }
};

exports.cambiarStatus = async (req, res, next) => {
  try {
    const u = await Usuario.findByPk(req.params.id);
    if (!u) throw new AppError('Usuario no encontrado', 404);
    await u.update({ status: req.body.status });
    res.json(apiResponse.ok(u, 'Status actualizado'));
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const u = await Usuario.findByPk(req.params.id);
    if (!u) throw new AppError('Usuario no encontrado', 404);
    await u.destroy();
    res.json(apiResponse.noContent('Usuario eliminado'));
  } catch (e) { next(e); }
};

exports.listarRoles = async (req, res, next) => {
  try {
    const roles = await UsuarioRol.findAll({
      where: { usuario_id_usuario: req.params.id },
      include: [{ model: Rol, as: 'rol' }],
    });
    res.json(apiResponse.ok(roles));
  } catch (e) { next(e); }
};

exports.asignarRol = async (req, res, next) => {
  try {
    const { id, idRol } = req.params;
    const existe = await UsuarioRol.findOne({ where: { usuario_id_usuario: id, rol_id_rol: idRol } });
    if (existe) throw new AppError('El usuario ya tiene ese rol', 409);
    const ur = await UsuarioRol.create({ usuario_id_usuario: id, rol_id_rol: idRol });
    res.status(201).json(apiResponse.created(ur));
  } catch (e) { next(e); }
};
