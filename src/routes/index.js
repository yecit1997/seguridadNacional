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
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Alertas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Alerta' }
 *       401:
 *         description: No autorizado
 * /alertas/usuario/{idUsuario}/no-leidas:
 *   get:
 *     summary: Listar alertas no leídas de un usuario
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Alertas no leídas obtenidas
 * /alertas/{id}:
 *   get:
 *     summary: Obtener alerta por ID
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Alerta obtenida
 *       404:
 *         description: Alerta no encontrada
 *   delete:
 *     summary: Eliminar alerta
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Alerta eliminada
 *       404:
 *         description: Alerta no encontrada
 * /alertas:
 *   post:
 *     summary: Crear nueva alerta
 *     tags: [Alertas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario: { type: integer }
 *               mensaje: { type: string }
 *               tipo: { type: string }
 *             required: [idUsuario, mensaje, tipo]
 *     responses:
 *       201:
 *         description: Alerta creada
 *       400:
 *         description: Datos inválidos
 * /alertas/{id}/leer:
 *   patch:
 *     summary: Marcar alerta como leída
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Alerta marcada como leída
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
 *     responses:
 *       200:
 *         description: Lista de conductores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Conductor' }
 *   post:
 *     summary: Crear nuevo conductor
 *     tags: [Conductores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPersona: { type: integer }
 *               numeroLicencia: { type: string }
 *               fechaVencimiento: { type: string, format: date }
 *             required: [idPersona, numeroLicencia]
 *     responses:
 *       201:
 *         description: Conductor creado
 * /conductores/{id}:
 *   get:
 *     summary: Obtener conductor por ID
 *     tags: [Conductores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Conductor obtenido
 *       404:
 *         description: Conductor no encontrado
 *   put:
 *     summary: Actualizar conductor
 *     tags: [Conductores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Conductor' }
 *     responses:
 *       200:
 *         description: Conductor actualizado
 *   delete:
 *     summary: Eliminar conductor
 *     tags: [Conductores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Conductor eliminado
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
 *     responses:
 *       200:
 *         description: Lista de vehículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Vehiculo' }
 *   post:
 *     summary: Crear nuevo vehículo
 *     tags: [Vehículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa: { type: string, example: "ABC-123" }
 *               marca: { type: string }
 *               modelo: { type: string }
 *               anio: { type: integer }
 *               tipo: { type: string }
 *             required: [placa, marca, modelo, anio]
 *     responses:
 *       201:
 *         description: Vehículo creado
 * /vehiculos/{id}:
 *   get:
 *     summary: Obtener vehículo por ID
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Vehículo obtenido
 *   put:
 *     summary: Actualizar vehículo
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Vehiculo' }
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 *   delete:
 *     summary: Eliminar vehículo
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Vehículo eliminado
 * /vehiculos/placa/{placa}:
 *   get:
 *     summary: Buscar vehículo por placa
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: placa
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Vehículo encontrado
 */
router.get   ('/vehiculos',              vehiculoCtrl.listarTodos);
router.get   ('/vehiculos/:id',          vehiculoCtrl.buscarPorId);
router.get   ('/vehiculos/placa/:placa', vehiculoCtrl.buscarPorPlaca);
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
 *     responses:
 *       200:
 *         description: Lista de tipos disponibles
 *   post:
 *     summary: Crear nuevo tipo de reporte
 *     tags: [Tipos de Reporte]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               descripcion: { type: string }
 *             required: [nombre]
 *     responses:
 *       201:
 *         description: Tipo creado
 * /tipos-reporte/{id}:
 *   get:
 *     summary: Obtener tipo de reporte por ID
 *     tags: [Tipos de Reporte]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tipo obtenido
 *   put:
 *     summary: Actualizar tipo de reporte
 *     tags: [Tipos de Reporte]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tipo actualizado
 *   delete:
 *     summary: Eliminar tipo de reporte
 *     tags: [Tipos de Reporte]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tipo eliminado
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
 *     responses:
 *       200:
 *         description: Lista de estados disponibles
 *   post:
 *     summary: Crear nuevo estado de reporte
 *     tags: [Status de Reporte]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               descripcion: { type: string }
 *             required: [nombre]
 *     responses:
 *       201:
 *         description: Estado creado
 * /status-reporte/{id}:
 *   get:
 *     summary: Obtener estado de reporte por ID
 *     tags: [Status de Reporte]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Estado obtenido
 *   put:
 *     summary: Actualizar estado de reporte
 *     tags: [Status de Reporte]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Estado actualizado
 *   delete:
 *     summary: Eliminar estado de reporte
 *     tags: [Status de Reporte]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Estado eliminado
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
 *     responses:
 *       200:
 *         description: Lista de personas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Persona' }
 *   post:
 *     summary: Crear nueva persona
 *     tags: [Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni: { type: string, example: "12345678" }
 *               nombre: { type: string }
 *               apellido: { type: string }
 *               email: { type: string, format: email }
 *               telefono: { type: string }
 *               direccion: { type: string }
 *             required: [dni, nombre, apellido]
 *     responses:
 *       201:
 *         description: Persona creada
 * /personas/{id}:
 *   get:
 *     summary: Obtener persona por ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Persona obtenida
 *   put:
 *     summary: Actualizar persona
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Persona' }
 *     responses:
 *       200:
 *         description: Persona actualizada
 *   delete:
 *     summary: Eliminar persona
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Persona eliminada
 * /personas/dni/{dni}:
 *   get:
 *     summary: Buscar persona por DNI
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Persona encontrada
 */
router.get   ('/personas',          personaCtrl.listarTodos);
router.get   ('/personas/:id',      personaCtrl.buscarPorId);
router.get   ('/personas/dni/:dni', personaCtrl.buscarPorDni);
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
 *     responses:
 *       200:
 *         description: Lista de personal administrativo
 *   post:
 *     summary: Crear nuevo personal administrativo
 *     tags: [Personal Administrativo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPersona: { type: integer }
 *               cargo: { type: string }
 *               departamento: { type: string }
 *             required: [idPersona, cargo]
 *     responses:
 *       201:
 *         description: Personal creado
 * /personal/{id}:
 *   get:
 *     summary: Obtener personal administrativo por ID
 *     tags: [Personal Administrativo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Personal obtenido
 *   put:
 *     summary: Actualizar personal administrativo
 *     tags: [Personal Administrativo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Personal actualizado
 *   delete:
 *     summary: Eliminar personal administrativo
 *     tags: [Personal Administrativo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Personal eliminado
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
 *     responses:
 *       200:
 *         description: Lista de reportes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Reporte' }
 *   post:
 *     summary: Crear nuevo reporte
 *     tags: [Reportes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo: { type: string }
 *               descripcion: { type: string }
 *               idUsuario: { type: integer }
 *               idTipo: { type: integer }
 *               idStatus: { type: integer }
 *             required: [titulo, idUsuario, idTipo]
 *     responses:
 *       201:
 *         description: Reporte creado
 * /reportes/{id}:
 *   get:
 *     summary: Obtener reporte por ID
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reporte obtenido
 *   put:
 *     summary: Actualizar reporte
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reporte actualizado
 *   delete:
 *     summary: Eliminar reporte
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reporte eliminado
 * /reportes/usuario/{idUsuario}:
 *   get:
 *     summary: Listar reportes por usuario
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reportes del usuario
 * /reportes/tipo/{idTipo}:
 *   get:
 *     summary: Listar reportes por tipo
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: idTipo
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reportes del tipo especificado
 * /reportes/status/{idStatus}:
 *   get:
 *     summary: Listar reportes por estado
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: idStatus
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reportes del estado especificado
 * /reportes/{id}/status/{idStatus}:
 *   patch:
 *     summary: Cambiar estado de un reporte
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: idStatus
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.get   ('/reportes',                      reporteCtrl.listarTodos);
router.get   ('/reportes/:id',                  reporteCtrl.buscarPorId);
router.get   ('/reportes/usuario/:idUsuario',   reporteCtrl.listarPorUsuario);
router.get   ('/reportes/tipo/:idTipo',         reporteCtrl.listarPorTipo);
router.get   ('/reportes/status/:idStatus',     reporteCtrl.listarPorStatus);
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
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Rol' }
 *   post:
 *     summary: Crear nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               descripcion: { type: string }
 *             required: [nombre]
 *     responses:
 *       201:
 *         description: Rol creado
 * /roles/{id}:
 *   get:
 *     summary: Obtener rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Rol obtenido
 *   put:
 *     summary: Actualizar rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Rol actualizado
 *   delete:
 *     summary: Eliminar rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Rol eliminado
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
 *     responses:
 *       200:
 *         description: Lista de supervisores
 *   post:
 *     summary: Crear nuevo supervisor
 *     tags: [Supervisores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPersona: { type: integer }
 *               numeroEmpleado: { type: string }
 *               turno: { type: string }
 *             required: [idPersona]
 *     responses:
 *       201:
 *         description: Supervisor creado
 * /supervisores/{id}:
 *   get:
 *     summary: Obtener supervisor por ID
 *     tags: [Supervisores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Supervisor obtenido
 *   put:
 *     summary: Actualizar supervisor
 *     tags: [Supervisores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Supervisor actualizado
 *   delete:
 *     summary: Eliminar supervisor
 *     tags: [Supervisores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Supervisor eliminado
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
 *     responses:
 *       200:
 *         description: Lista de guardas
 *   post:
 *     summary: Crear nuevo guarda
 *     tags: [Guardas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPersona: { type: integer }
 *               idSupervisor: { type: integer }
 *               numeroEmpleado: { type: string }
 *             required: [idPersona, idSupervisor]
 *     responses:
 *       201:
 *         description: Guarda creado
 * /guardas/{id}:
 *   get:
 *     summary: Obtener guarda por ID
 *     tags: [Guardas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Guarda obtenido
 *   put:
 *     summary: Actualizar guarda
 *     tags: [Guardas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Guarda actualizado
 *   delete:
 *     summary: Eliminar guarda
 *     tags: [Guardas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Guarda eliminado
 * /guardas/supervisor/{supervisorId}:
 *   get:
 *     summary: Listar guardas por supervisor
 *     tags: [Guardas]
 *     parameters:
 *       - in: path
 *         name: supervisorId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Guardas del supervisor
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario: { type: string }
 *               password: { type: string, format: password }
 *             required: [usuario, password]
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: { type: string }
 *                 usuario: { $ref: '#/components/schemas/Usuario' }
 *       401:
 *         description: Credenciales inválidas
 * /auth/registro:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *             required: [username, email, password]
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Datos inválidos o usuario ya existe
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
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Usuario' }
 *   post:
 *     summary: Crear nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *             required: [username, email, password]
 *     responses:
 *       201:
 *         description: Usuario creado
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuario obtenido
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuario eliminado
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
 *     responses:
 *       200:
 *         description: Estado del usuario actualizado
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
 *     responses:
 *       200:
 *         description: Rol asignado al usuario
 */
router.get   ('/usuarios',                    usuarioCtrl.listarTodos);
router.get   ('/usuarios/:id',                usuarioCtrl.buscarPorId);
router.post  ('/usuarios',                    usuarioValidator, usuarioCtrl.crear);
router.put   ('/usuarios/:id',                usuarioCtrl.actualizar);
router.patch ('/usuarios/:id/status',         usuarioCtrl.cambiarStatus);
router.post  ('/usuarios/:id/roles/:idRol',   usuarioCtrl.asignarRol);
router.delete('/usuarios/:id',                usuarioCtrl.eliminar);

export default router;
