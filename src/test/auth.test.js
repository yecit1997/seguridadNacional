import { describe, it, expect, beforeAll } from '@jest/globals';
import request from './helpers/testHelper.js';
import jwt from 'jsonwebtoken';

describe('Auth API Endpoints', () => {
  const testPayload = { id: 1, nombreUsuario: 'test', rol: 'admin' };
  const testToken = jwt.sign(testPayload, process.env.JWT_SECRET || 'dev_secret_key_2024', { expiresIn: '1h' });

  describe('POST /api/auth/login', () => {
    it('should return 400 if credentials are missing', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({ nombre_usuario: '' });

      expect(response.status).toBe(400);
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({ nombre_usuario: 'invalid', contrasena: 'invalid' });

      expect([400, 401]).toContain(response.status);
    });
  });

  describe('GET /api/usuarios (protected)', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/usuarios');
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/usuarios')
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(200);
    });
  });
});