import Rol from '../models/Rol.js';
import Usuario from '../models/Usuario.js';
import Persona from '../models/Persona.js';
import { rolService } from '../services/CatalogosService.js';
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

    // 2. Crear Usuario Administrador por defecto si no existe
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
        await nuevoAdmin.addRol(rolAdmin);
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
        if (rolAdmin) await adminExists.addRol(rolAdmin);
      }
    }

    console.log('🌱 Sincronización de datos base completada.');
  } catch (error) {
    console.error('❌ Error en el proceso de seeding:', error);
  }
};
