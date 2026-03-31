import usuarioService from '../services/UsuarioService.js';
import { apiResponse } from '../middleware/response.js';

/**
 * Controlador de Usuarios
 * Maneja las peticiones HTTP delegando la lógica de negocio al UsuarioService.
 */

export const listarTodos = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.listarConDetalles();
    res.json(apiResponse.ok(usuarios));
  } catch (e) { next(e); }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const usuario = await usuarioService.findById(req.params.id, {
      include: ['persona', 'roles']
    });
    res.json(apiResponse.ok(usuario));
  } catch (e) { next(e); }
};

export const actualizar = async (req, res, next) => {
  try {
    const { nombre_usuario, persona_id_persona, contrasena } = req.body;
    const updateData = {};
    
    if (nombre_usuario) updateData.nombre_usuario = nombre_usuario;
    if (persona_id_persona) updateData.persona_id_persona = persona_id_persona;
    if (contrasena) updateData.contrasena = contrasena;
    
    const usuario = await usuarioService.update(req.params.id, updateData);
    res.json(apiResponse.ok(usuario, 'Usuario actualizado correctamente'));
  } catch (e) { next(e); }
};

export const crear = async (req, res, next) => {
  try {
    const { nombre_usuario, contrasena, persona_id_persona, roles } = req.body;
    
    if (!nombre_usuario || !contrasena || !persona_id_persona) {
      return res.status(400).json(apiResponse.error('Faltan datos requeridos: nombre_usuario, contrasena, persona_id_persona'));
    }

    const nuevoUsuario = await usuarioService.create({
      nombre_usuario,
      contrasena,
      persona_id_persona,
      status: true
    });

    if (roles && Array.isArray(roles) && roles.length > 0) {
      for (const rolId of roles) {
        await usuarioService.asignarRol(nuevoUsuario.id_usuario, rolId);
      }
    }

    const usuarioConRoles = await usuarioService.findById(nuevoUsuario.id_usuario, {
      include: ['persona', 'roles']
    });

    res.status(201).json(apiResponse.created(usuarioConRoles));
  } catch (e) { next(e); }
};

export const cambiarStatus = async (req, res, next) => {
  try {
    const activo = req.query.activo === 'true' || req.query.activo === true;
    const usuario = await usuarioService.toggleStatus(req.params.id, activo);
    res.json(apiResponse.ok(usuario, 'Estado del usuario actualizado exitosamente'));
  } catch (e) { next(e); }
};

export const eliminar = async (req, res, next) => {
  try {
    await usuarioService.delete(req.params.id);
    res.json(apiResponse.ok(null, 'Usuario eliminado correctamente'));
  } catch (e) { next(e); }
};

export const listarRoles = async (req, res, next) => {
  try {
    const usuario = await usuarioService.findById(req.params.id, { include: ['roles'] });
    res.json(apiResponse.ok(usuario.roles));
  } catch (e) { next(e); }
};

export const asignarRol = async (req, res, next) => {
  try {
    const { id, idRol } = req.params;
    // Aquí se podría implementar una lógica de asignación más compleja en el servicio si fuera necesario
    const resultado = await usuarioService.asignarRol(id, idRol);
    res.status(201).json(apiResponse.created(resultado, 'Rol asignado correctamente'));
  } catch (e) { next(e); }
};
