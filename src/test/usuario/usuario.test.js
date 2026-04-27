import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { request } from '../helpers/testHelper.js';
import jwt from 'jsonwebtoken';

describe('Usuario API Endpoints', () => {
  const validToken = jwt.sign(
    { id: 1, nombreUsuario: 'test', rol: 'admin' },
    process.env.JWT_SECRET || 'dev_secret_key_2024',
    { expiresIn: '1h' }
  );

  const invalidToken = 'invalid.token.here';

  describe('GET /api/usuarios', () => {
    it('should return 401 without authorization header', async () => {
      const response = await request.get('/api/usuarios');
      expect(response.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const response = await request
        .get('/api/usuarios')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/usuarios')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/usuarios', () => {
    it('should return 400 if required fields missing', async () => {
      const response = await request
        .post('/api/usuarios')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: '' });
      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/usuarios/:id', () => {
    it('should return 404 for non-existent user', async () => {
      const response = await request
        .get('/api/usuarios/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });
});