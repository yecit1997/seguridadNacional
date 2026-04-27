import app from '../../../app.js';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

export const request = supertest(app);

export const testUser = {
  nombre: 'TestUsuario',
  email: 'test@test.com',
  password: 'TestPassword123',
  nombreUsuario: 'testuser'
};

export const adminUser = {
  nombre: 'AdminTest',
  email: 'admin@test.com',
  password: 'AdminPassword123',
  nombreUsuario: 'adminuser'
};

export const generateToken = (payload = { id: 1, nombreUsuario: 'test', rol: 'admin' }) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret_key_2024', { expiresIn: '1h' });
};