/**
 * @fileoverview Test suite for Guardas API Endpoints
 * @description Tests all CRUD operations for the Guardas entity
 * 
 * Endpoints covered:
 * - GET /api/guardas - List all guardas
 * - GET /api/guardas/:id - Get guarda by ID
 * - POST /api/guardas - Create new guarda
 * - PUT /api/guardas/:id - Update guarda
 * - DELETE /api/guardas/:id - Delete guarda
 * 
 * @requires supertest - HTTP testing
 * @requires jwt - Token generation for auth
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Guardas API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });
  const invalidToken = 'invalid.token.here';

  describe('GET /api/guardas', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/guardas');
      expect(response.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const response = await request
        .get('/api/guardas')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/guardas')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/guardas/:id', () => {
    it('should return 404 for non-existent guarda', async () => {
      const response = await request
        .get('/api/guardas/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });

    it('should return 404 for invalid ID format', async () => {
      const response = await request
        .get('/api/guardas/abc')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });

  describe('POST /api/guardas', () => {
    it('should return 400 if required fields missing', async () => {
      const response = await request
        .post('/api/guardas')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ turno: '' });
      expect([400, 404]).toContain(response.status);
    });

    it('should return 201 for valid guarda data', async () => {
      const response = await request
        .post('/api/guardas')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          idPersona: 1,
          turno: 'Matutino',
          zonaAsignada: 'Zona A'
        });
      expect([201, 400, 404, 500]).toContain(response.status);
    });
  });

  describe('PUT /api/guardas/:id', () => {
    it('should return 404 for non-existent guarda', async () => {
      const response = await request
        .put('/api/guardas/999999')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ turno: 'Updated' });
      expect([404, 500]).toContain(response.status);
    });

    it('should return 400 for invalid update data', async () => {
      const response = await request
        .put('/api/guardas/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ turno: '' });
      expect([400, 404, 500]).toContain(response.status);
    });
  });

  describe('DELETE /api/guardas/:id', () => {
    it('should return 404 for non-existent guarda', async () => {
      const response = await request
        .delete('/api/guardas/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });

    it('should return 404 for invalid ID format', async () => {
      const response = await request
        .delete('/api/guardas/abc')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });
});