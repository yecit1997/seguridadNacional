import { describe, it, expect, beforeAll } from '@jest/globals';
import { request } from '../helpers/testHelper.js';
import jwt from 'jsonwebtoken';

describe('Auth API Endpoints', () => {
  const testPayload = { id: 1, nombreUsuario: 'test', rol: 'admin' };
  const testToken = jwt.sign(testPayload, process.env.JWT_SECRET || 'dev_secret_key_2024', { expiresIn: '1h' });

  describe('POST /api/auth/login', () => {
    // Test: Login cuando faltan las credenciales
    it('Debería devolver 400 si faltan las credenciales.', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({ nombre_usuario: '' });

      expect(response.status).toBe(400);
    });

    // Test: Login cuando la contraseña está vacía
    it('Debería devolver 401 para credenciales inválidas.', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({ nombre_usuario: 'invalid', contrasena: 'invalid' });

      expect([400, 401]).toContain(response.status);
    });
  });

  // Test: Middleware de autenticación para rutas protegidas
  describe('GET /api/usuarios (protected)', () => {
    it('Debería devolver 401 sin token', async () => {
      const response = await request.get('/api/usuarios');
      expect(response.status).toBe(401);
    });

    // Test: Acceso a ruta protegida con token válido
    it('Debería devolver 200 con token válido', async () => {
      const response = await request
        .get('/api/usuarios')
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(200);
    });
  });
});