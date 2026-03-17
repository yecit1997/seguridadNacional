import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';
import Persona from './Persona.js';

/**
 * Modelo Usuario
 * Gestiona las credenciales de acceso y el estado de la cuenta.
 * Incluye hashing automático de contraseñas.
 */
const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      len: [4, 50],
    },
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  persona_id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Persona,
      key: 'id_persona',
    },
  },
}, {
  tableName: 'usuario',
  timestamps: false,
  // Sopes para proteger datos sensibles por defecto
  defaultScope: {
    attributes: { exclude: ['contrasena'] },
  },
  scopes: {
    withPassword: { attributes: {} },
  },
  hooks: {
    // Hashear la contraseña antes de guardar
    beforeSave: async (usuario) => {
      if (usuario.changed('contrasena')) {
        const salt = await bcrypt.genSalt(10);
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
      }
    },
  },
});

// Relación: Un Usuario pertenece a una Persona
Usuario.belongsTo(Persona, { foreignKey: 'persona_id_persona', as: 'persona' });
Persona.hasOne(Usuario, { foreignKey: 'persona_id_persona', as: 'usuario' });

/**
 * Método de instancia para verificar la contraseña.
 */
Usuario.prototype.validarContrasena = async function (password) {
  return await bcrypt.compare(password, this.contrasena);
};

export default Usuario;
