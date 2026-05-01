import sequelize from '../config/database.js';
import '../models/index.js'; // Importar modelos para registrarlos

export default async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true }); // Sincronizar modelos y crear tablas
};