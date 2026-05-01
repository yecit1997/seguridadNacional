import sequelize from '../config/database.js';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret_key_2024';
process.env.JWT_EXPIRE = '24h';
process.env.PORT = '8080';

beforeAll(async () => {
  await sequelize.sync({ force: true });
}, 30000);

afterAll(async () => {
  if (sequelize) {
    await sequelize.close();
  }
});