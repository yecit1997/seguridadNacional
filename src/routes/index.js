const router = require('express').Router();

const personaCtrl     = require('../controllers/personaController');
const rolCtrl         = require('../controllers/rolController');
const usuarioCtrl     = require('../controllers/usuarioController');
const supervisorCtrl  = require('../controllers/supervisorController');
const guardaCtrl      = require('../controllers/guardaController');
const personalCtrl    = require('../controllers/personalController');
const conductorCtrl   = require('../controllers/conductorController');
const vehiculoCtrl    = require('../controllers/vehiculoController');
const catalogosCtrl   = require('../controllers/catalogosController');
const reporteCtrl     = require('../controllers/reporteController');
const alertaCtrl      = require('../controllers/alertaController');

// ── Personas ──────────────────────────────────────────────────
router.get   ('/personas',          personaCtrl.listarTodos);
router.get   ('/personas/dni/:dni', personaCtrl.buscarPorDni);
router.get   ('/personas/:id',      personaCtrl.buscarPorId);
router.post  ('/personas',          personaCtrl.crear);
router.put   ('/personas/:id',      personaCtrl.actualizar);
router.delete('/personas/:id',      personaCtrl.eliminar);

// ── Roles ─────────────────────────────────────────────────────
router.get   ('/roles',     rolCtrl.listarTodos);
router.get   ('/roles/:id', rolCtrl.buscarPorId);
router.post  ('/roles',     rolCtrl.crear);
router.put   ('/roles/:id', rolCtrl.actualizar);
router.delete('/roles/:id', rolCtrl.eliminar);

// ── Usuarios ──────────────────────────────────────────────────
router.get   ('/usuarios',                    usuarioCtrl.listarTodos);
router.get   ('/usuarios/:id',                usuarioCtrl.buscarPorId);
router.get   ('/usuarios/:id/roles',          usuarioCtrl.listarRoles);
router.post  ('/usuarios',                    usuarioCtrl.crear);
router.patch ('/usuarios/:id/status',         usuarioCtrl.cambiarStatus);
router.post  ('/usuarios/:id/roles/:idRol',   usuarioCtrl.asignarRol);
router.delete('/usuarios/:id',                usuarioCtrl.eliminar);

// ── Supervisores ──────────────────────────────────────────────
router.get   ('/supervisores',     supervisorCtrl.listarTodos);
router.get   ('/supervisores/:id', supervisorCtrl.buscarPorId);
router.post  ('/supervisores',     supervisorCtrl.crear);
router.put   ('/supervisores/:id', supervisorCtrl.actualizar);
router.delete('/supervisores/:id', supervisorCtrl.eliminar);

// ── Guardas ───────────────────────────────────────────────────
router.get   ('/guardas',                         guardaCtrl.listarTodos);
router.get   ('/guardas/supervisor/:supervisorId', guardaCtrl.listarPorSupervisor);
router.get   ('/guardas/:id',                     guardaCtrl.buscarPorId);
router.post  ('/guardas',                         guardaCtrl.crear);
router.put   ('/guardas/:id',                     guardaCtrl.actualizar);
router.delete('/guardas/:id',                     guardaCtrl.eliminar);

// ── Personal Administrativo ───────────────────────────────────
router.get   ('/personal',     personalCtrl.listarTodos);
router.get   ('/personal/:id', personalCtrl.buscarPorId);
router.post  ('/personal',     personalCtrl.crear);
router.put   ('/personal/:id', personalCtrl.actualizar);
router.delete('/personal/:id', personalCtrl.eliminar);

// ── Conductores ───────────────────────────────────────────────
router.get   ('/conductores',     conductorCtrl.listarTodos);
router.get   ('/conductores/:id', conductorCtrl.buscarPorId);
router.post  ('/conductores',     conductorCtrl.crear);
router.put   ('/conductores/:id', conductorCtrl.actualizar);
router.delete('/conductores/:id', conductorCtrl.eliminar);

// ── Vehículos ─────────────────────────────────────────────────
router.get   ('/vehiculos',              vehiculoCtrl.listarTodos);
router.get   ('/vehiculos/placa/:placa', vehiculoCtrl.buscarPorPlaca);
router.get   ('/vehiculos/:id',          vehiculoCtrl.buscarPorId);
router.post  ('/vehiculos',              vehiculoCtrl.crear);
router.put   ('/vehiculos/:id',          vehiculoCtrl.actualizar);
router.delete('/vehiculos/:id',          vehiculoCtrl.eliminar);

// ── Tipos de Reporte ──────────────────────────────────────────
router.get   ('/tipos-reporte',     catalogosCtrl.tipoReporte.listarTodos);
router.get   ('/tipos-reporte/:id', catalogosCtrl.tipoReporte.buscarPorId);
router.post  ('/tipos-reporte',     catalogosCtrl.tipoReporte.crear);
router.put   ('/tipos-reporte/:id', catalogosCtrl.tipoReporte.actualizar);
router.delete('/tipos-reporte/:id', catalogosCtrl.tipoReporte.eliminar);

// ── Status Reporte ────────────────────────────────────────────
router.get   ('/status-reporte',     catalogosCtrl.statusReporte.listarTodos);
router.get   ('/status-reporte/:id', catalogosCtrl.statusReporte.buscarPorId);
router.post  ('/status-reporte',     catalogosCtrl.statusReporte.crear);
router.put   ('/status-reporte/:id', catalogosCtrl.statusReporte.actualizar);
router.delete('/status-reporte/:id', catalogosCtrl.statusReporte.eliminar);

// ── Reportes ──────────────────────────────────────────────────
router.get   ('/reportes',                      reporteCtrl.listarTodos);
router.get   ('/reportes/:id',                  reporteCtrl.buscarPorId);
router.get   ('/reportes/usuario/:idUsuario',   reporteCtrl.listarPorUsuario);
router.get   ('/reportes/tipo/:idTipo',         reporteCtrl.listarPorTipo);
router.get   ('/reportes/status/:idStatus',     reporteCtrl.listarPorStatus);
router.post  ('/reportes',                      reporteCtrl.crear);
router.put   ('/reportes/:id',                  reporteCtrl.actualizar);
router.patch ('/reportes/:id/status/:idStatus', reporteCtrl.actualizarStatus);
router.delete('/reportes/:id',                  reporteCtrl.eliminar);

// ── Alertas ───────────────────────────────────────────────────
router.get   ('/alertas/usuario/:idUsuario',           alertaCtrl.listarPorUsuario);
router.get   ('/alertas/usuario/:idUsuario/no-leidas', alertaCtrl.listarNoLeidas);
router.get   ('/alertas/:id',                          alertaCtrl.buscarPorId);
router.post  ('/alertas',                              alertaCtrl.crear);
router.patch ('/alertas/:id/leer',                     alertaCtrl.marcarLeida);
router.delete('/alertas/:id',                          alertaCtrl.eliminar);

module.exports = router;
