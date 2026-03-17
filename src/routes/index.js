import { Router } from 'express';
import * as personaCtrl from '../controllers/personaController.js';
import * as usuarioCtrl from '../controllers/usuarioController.js';
import * as authCtrl from '../controllers/authController.js';
import * as rolCtrl from '../controllers/rolController.js';
import * as catalogosCtrl from '../controllers/catalogosController.js';
import * as reporteCtrl from '../controllers/reporteController.js';
import * as personalCtrl from '../controllers/personalController.js';
import * as supervisorCtrl from '../controllers/supervisorController.js';
import * as conductorCtrl from '../controllers/conductorController.js';
import * as vehiculoCtrl from '../controllers/vehiculoController.js';
import * as alertaCtrl from '../controllers/alertaController.js';
import * as guardaCtrl from '../controllers/guardaController.js';

import { personaValidator, usuarioValidator, reporteValidator } from '../validators/index.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Alertas
 *     description: Gestión de alertas y notificaciones
 *   - name: Conductores
 *     description: Gestión de conductores vinculados a personas
 *   - name: Vehículos
 *     description: Gestión de activos de transporte
 *   - name: Tipos de Reporte
 *     description: Catálogos de tipos de incidencia
 *   - name: Status de Reporte
 *     description: Catálogos de estados de incidencia
 *   - name: Personas
 *     description: Gestión de personas (DNI, Nombres, etc.)
 *   - name: Personal Administrativo
 *     description: Especialización de usuarios administrativos
 *   - name: Reportes
 *     description: Gestión de reportes operativos
 *   - name: Roles
 *     description: Gestión de roles y permisos
 *   - name: Supervisores
 *     description: Gestión de personal de supervisión
 *   - name: Guardas
 *     description: Gestión de personal de seguridad
 *   - name: Autenticación
 *     description: Login y registro de usuarios
 *   - name: Usuarios
 *     description: Gestión de cuentas de usuario
 */

/**
 * 1. Alertas
 */
/** @swagger
 * /alertas/usuario/{idUsuario}:
 *   get:
 *     summary: Listar todas las alertas de un usuario
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema: { type: integer }
 */
router.get   ('/alertas/usuario/:idUsuario',           alertaCtrl.listarPorUsuario);
router.get   ('/alertas/usuario/:idUsuario/no-leidas', alertaCtrl.listarNoLeidas);
router.get   ('/alertas/:id',                          alertaCtrl.buscarPorId);
router.post  ('/alertas',                              alertaCtrl.crear);
router.patch ('/alertas/:id/leer',                     alertaCtrl.marcarLeida);
router.delete('/alertas/:id',                          alertaCtrl.eliminar);

/**
 * 2. Conductores
 */
/** @swagger
 * /conductores:
 *   get:
 *     summary: Listar todos los conductores
 *     tags: [Conductores]
 */
router.get   ('/conductores',     conductorCtrl.listarTodos);
router.get   ('/conductores/:id', conductorCtrl.buscarPorId);
router.post  ('/conductores',     conductorCtrl.crear);
router.put   ('/conductores/:id', conductorCtrl.actualizar);
router.delete('/conductores/:id', conductorCtrl.eliminar);

/**
 * 3. Vehículos
 */
/** @swagger
 * /vehiculos:
 *   get:
 *     summary: Listar todos los vehículos
 *     tags: [Vehículos]
 */
router.get   ('/vehiculos',              vehiculoCtrl.listarTodos);
router.get   ('/vehiculos/:id',          vehiculoCtrl.buscarPorId);
router.get   ('/vehiculos/placa/{placa}', vehiculoCtrl.buscarPorPlaca);
router.post  ('/vehiculos',              vehiculoCtrl.crear);
router.put   ('/vehiculos/:id',          vehiculoCtrl.actualizar);
router.delete('/vehiculos/:id',          vehiculoCtrl.eliminar);

/**
 * 4. Tipos de Reporte
 */
/** @swagger
 * /tipos-reporte:
 *   get:
 *     summary: Listar todos los tipos de reporte
 *     tags: [Tipos de Reporte]
 */
router.get   ('/tipos-reporte',     catalogosCtrl.listarTipos);
router.get   ('/tipos-reporte/:id', catalogosCtrl.buscarTipoPorId);
router.post  ('/tipos-reporte',     catalogosCtrl.crearTipo);
router.put   ('/tipos-reporte/:id', catalogosCtrl.actualizarTipo);
router.delete('/tipos-reporte/:id', catalogosCtrl.eliminarTipo);

/**
 * 5. Status de Reporte
 */
/** @swagger
 * /status-reporte:
 *   get:
 *     summary: Listar todos los estados de reporte
 *     tags: [Status de Reporte]
 */
router.get   ('/status-reporte',     catalogosCtrl.listarStatus);
router.get   ('/status-reporte/:id', catalogosCtrl.buscarStatusPorId);
router.post  ('/status-reporte',     catalogosCtrl.crearStatus);
router.put   ('/status-reporte/:id', catalogosCtrl.actualizarStatus);
router.delete('/status-reporte/:id', catalogosCtrl.eliminarStatus);

/**
 * 6. Personas
 */
/** @swagger
 * /personas:
 *   get:
 *     summary: Listar todas las personas
 *     tags: [Personas]
 */
router.get   ('/personas',          personaCtrl.listarTodos);
router.get   ('/personas/:id',      personaCtrl.buscarPorId);
router.get   ('/personas/dni/{dni}', personaCtrl.buscarPorDni);
router.post  ('/personas',          personaValidator, personaCtrl.crear);
router.put   ('/personas/:id',      personaValidator, personaCtrl.actualizar);
router.delete('/personas/:id',      personaCtrl.eliminar);

/**
 * 7. Personal Administrativo
 */
/** @swagger
 * /personal:
 *   get:
 *     summary: Listar personal administrativo
 *     tags: [Personal Administrativo]
 */
router.get   ('/personal',          personalCtrl.listarTodos);
router.get   ('/personal/:id',      personalCtrl.buscarPorId);
router.post  ('/personal',          personalCtrl.crear);
router.put   ('/personal/:id',      personalCtrl.actualizar);
router.delete('/personal/:id',      personalCtrl.eliminar);

/**
 * 8. Reportes
 */
/** @swagger
 * /reportes:
 *   get:
 *     summary: Listar todos los reportes operativos
 *     tags: [Reportes]
 */
router.get   ('/reportes',                      reporteCtrl.listarTodos);
router.get   ('/reportes/:id',                  reporteCtrl.buscarPorId);
router.get   ('/reportes/usuario/{idUsuario}',   reporteCtrl.listarPorUsuario);
router.get   ('/reportes/tipo/{idTipo}',         reporteCtrl.listarPorTipo);
router.get   ('/reportes/status/{idStatus}',     reporteCtrl.listarPorStatus);
router.post  ('/reportes',                      reporteValidator, reporteCtrl.crear);
router.put   ('/reportes/:id',                  reporteValidator, reporteCtrl.actualizar);
router.patch ('/reportes/:id/status/:idStatus', reporteCtrl.actualizarStatus);
router.delete('/reportes/:id',                  reporteCtrl.eliminar);

/**
 * 9. Roles
 */
/** @swagger
 * /roles:
 *   get:
 *     summary: Listar todos los roles del sistema
 *     tags: [Roles]
 */
router.get   ('/roles',     rolCtrl.listarTodos);
router.get   ('/roles/:id', rolCtrl.buscarPorId);
router.post  ('/roles',     rolCtrl.crear);
router.put   ('/roles/:id', rolCtrl.actualizar);
router.delete('/roles/:id', rolCtrl.eliminar);

/**
 * 10. Supervisores
 */
/** @swagger
 * /supervisores:
 *   get:
 *     summary: Listar todos los supervisores
 *     tags: [Supervisores]
 */
router.get   ('/supervisores',     supervisorCtrl.listarTodos);
router.get   ('/supervisores/:id', supervisorCtrl.buscarPorId);
router.post  ('/supervisores',     supervisorCtrl.crear);
router.put   ('/supervisores/:id', supervisorCtrl.actualizar);
router.delete('/supervisores/:id', supervisorCtrl.eliminar);

/**
 * 11. Guardas
 */
/** @swagger
 * /guardas:
 *   get:
 *     summary: Listar todos los guardas
 *     tags: [Guardas]
 * /guardas/supervisor/{supervisorId}:
 *   get:
 *     summary: Listar guardas por supervisor
 *     tags: [Guardas]
 *     parameters:
 *       - in: path
 *         name: supervisorId
 *         required: true
 *         schema: { type: integer }
 */
router.get   ('/guardas',                         guardaCtrl.listarTodos);
router.get   ('/guardas/supervisor/:supervisorId', guardaCtrl.listarPorSupervisor);
router.get   ('/guardas/:id',                     guardaCtrl.buscarPorId);
router.post  ('/guardas',                         guardaCtrl.crear);
router.put   ('/guardas/:id',                     guardaCtrl.actualizar);
router.delete('/guardas/:id',                     guardaCtrl.eliminar);

/**
 * 12. Autenticación
 */
/** @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión — retorna JWT
 *     tags: [Autenticación]
 * /auth/registro:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Autenticación]
 */
router.post('/auth/login',    authCtrl.login);
router.post('/auth/registro', usuarioValidator, usuarioCtrl.crear);

/**
 * 13. Usuarios
 */
/** @swagger
 * /usuarios:
 *   get:
 *     summary: Listar todos los usuarios del sistema
 *     tags: [Usuarios]
 * /usuarios/{id}/status:
 *   patch:
 *     summary: Activar o desactivar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: activo
 *         required: true
 *         schema: { type: boolean }
 * /usuarios/{id}/roles/{idRol}:
 *   post:
 *     summary: Asignar rol a usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: idRol
 *         required: true
 *         schema: { type: integer }
 */
router.get   ('/usuarios',                    usuarioCtrl.listarTodos);
router.get   ('/usuarios/:id',                usuarioCtrl.buscarPorId);
router.post  ('/usuarios',                    usuarioValidator, usuarioCtrl.crear);
router.patch ('/usuarios/:id/status',         usuarioCtrl.cambiarStatus);
router.post  ('/usuarios/:id/roles/:idRol',   usuarioCtrl.asignarRol);
router.delete('/usuarios/:id',                usuarioCtrl.eliminar);

export default router;
