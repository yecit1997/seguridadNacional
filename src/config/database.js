import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

/**
 * Configuración de la instancia de Sequelize para MySQL.
 * Se aplican estándares profesionales para nombres de tablas y logging.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      // Mantenemos timestamps para auditoría profesional
      timestamps: true,
      // Usamos snake_case para las columnas por convención de DB
      underscored: true,
      // Evitamos el plural automático de Sequelize para mayor control
      freezeTableName: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  }
);

export default sequelize;
