import Rol from '../models/Rol.js';
import Usuario from '../models/Usuario.js';
import Persona from '../models/Persona.js';
import { TipoReporte, StatusReporte } from '../models/Catalogos.js';
import { rolService, tipoReporteService, statusReporteService } from '../services/CatalogosService.js';
import usuarioService from '../services/UsuarioService.js';

/**
 * Inicializador de datos base (Seeder).
 * Replicando la lógica de DataInitializer de Spring Boot.
 */
export const seedData = async () => {
  try {
    console.log('🌱 Iniciando sincronización de datos base...');

    // 1. Crear Roles ADMIN y USER si no existen
    const rolesRequeridos = ['ADMIN', 'USER'];
    for (const nombreRol of rolesRequeridos) {
      const [rol, created] = await Rol.findOrCreate({
        where: { nombre: nombreRol }
      });
      if (created) console.log(`✅ Rol creado: ${nombreRol}`);
    }

    // 2. Crear Tipos de Reporte si no existen
    const tiposReporteRequeridos = [
      { nombre: 'Entrada/Salida Personal', descripcion: 'Registro de entrada y salida de personal' },
      { nombre: 'Entrada/Salida Vehículos', descripcion: 'Registro de entrada y salida de vehículos' },
      { nombre: 'Incidentes/Accidentes', descripcion: 'Reportes de incidentes y accidentes' }
    ];
    for (const tipo of tiposReporteRequeridos) {
      const [tipoReporte, created] = await TipoReporte.findOrCreate({
        where: { nombre: tipo.nombre },
        defaults: { descripcion: tipo.descripcion }
      });
      if (created) console.log(`✅ Tipo de reporte creado: ${tipo.nombre}`);
    }

    // 3. Crear Estados de Reporte si no existen
    const statusRequeridos = [
      { nombre: 'Pendiente', descripcion: 'Reporte creado, pendiente de revisión' },
      { nombre: 'En revisión', descripcion: 'Reporte siendo revisado' },
      { nombre: 'Aprobado', descripcion: 'Reporte aprobado' },
      { nombre: 'Rechazado', descripcion: 'Reporte rechazado' },
      { nombre: 'Completado', descripcion: 'Reporte completado' }
    ];
    for (const status of statusRequeridos) {
      const [statusReporte, created] = await StatusReporte.findOrCreate({
        where: { nombre: status.nombre },
        defaults: { descripcion: status.descripcion }
      });
      if (created) console.log(`✅ Estado de reporte creado: ${status.nombre}`);
    }

    // 4. Crear Usuario Administrador por defecto si no existe
    const adminExists = await Usuario.findOne({ where: { nombre_usuario: 'admin' } });
    
    if (!adminExists) {
      // Necesitamos una Persona para el usuario admin
      const [adminPersona] = await Persona.findOrCreate({
        where: { dni: '0000000000' },
        defaults: {
          nombre: 'Administrador',
          apellido: 'Sistema',
          correo: 'admin@seguridad.com',
          telefono: '0000000000'
        }
      });

      // Crear el usuario
      const nuevoAdmin = await Usuario.create({
        nombre_usuario: 'admin',
        contrasena: 'admin123', // El hook beforeSave se encargará del hash
        status: true,
        persona_id_persona: adminPersona.id_persona
      });

      // Asignar rol ADMIN
      const rolAdmin = await Rol.findOne({ where: { nombre: 'ADMIN' } });
      if (rolAdmin) {
        await nuevoAdmin.addRoles(rolAdmin);
      }

      console.log('=========================================');
      console.log('USUARIO ADMINISTRADOR CREADO POR DEFECTO');
      console.log('Usuario: admin');
      console.log('Contraseña: admin123');
      const rolesAdmin = await nuevoAdmin.getRoles();
      console.log(`Roles asignados: ${rolesAdmin.map(r => r.nombre).join(', ')}`);
      console.log('=========================================');
    } else {
      console.log('✅ El usuario admin ya existe.');
      const rolesAdmin = await adminExists.getRoles();
      if (rolesAdmin.length === 0) {
        console.log('⚠️ El admin no tiene roles, asignando ADMIN...');
        const rolAdmin = await Rol.findOne({ where: { nombre: 'ADMIN' } });
        if (rolAdmin) await adminExists.addRoles(rolAdmin);
      }
    }

    console.log('🌱 Sincronización de datos base completada.');
  } catch (error) {
    console.error('❌ Error en el proceso de seeding:', error);
  }
};
