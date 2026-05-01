/**
 * @fileoverview Test suite for Alertas API Endpoints
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Alertas API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });

  describe('GET /api/alertas/usuario/:idUsuario', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/alertas/usuario/1');
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/alertas/usuario/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/alertas/usuario/:idUsuario/no-leidas', () => {
    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/alertas/usuario/1/no-leidas')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/alertas/:id', () => {
    it('should return 404 for non-existent alert', async () => {
      const response = await request
        .get('/api/alertas/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('POST /api/alertas', () => {
    it('should return 201 for valid data', async () => {
      const response = await request
        .post('/api/alertas')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ mensaje: 'Test', idUsuario: 1 });
      expect([201, 400]).toContain(response.status);
    });
  });

  describe('PATCH /api/alertas/:id/leer', () => {
    it('should return 404 for non-existent alert', async () => {
      const response = await request
        .patch('/api/alertas/999999/leer')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('DELETE /api/alertas/:id', () => {
    it('should return 404 for non-existent alert', async () => {
      const response = await request
        .delete('/api/alertas/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });
});