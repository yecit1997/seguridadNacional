const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      // Evita que Sequelize agregue createdAt/updatedAt automáticamente
      timestamps: false,
      // Usa los nombres de columna exactamente como se definen
      underscored: false,
    },
  }
);

module.exports = sequelize;
