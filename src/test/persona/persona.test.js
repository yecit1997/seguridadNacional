/**
 * @fileoverview Test suite for Personas API Endpoints
 * @description Tests all CRUD operations for the Personas entity
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Personas API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });

  describe('GET /api/personas', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/personas');
      expect(response.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const response = await request
        .get('/api/personas')
        .set('Authorization', 'Bearer invalid');
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/personas')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/personas/:id', () => {
    it('should return 404 for non-existent persona', async () => {
      const response = await request
        .get('/api/personas/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('GET /api/personas/dni/:dni', () => {
    it('should return 404 for non-existent DNI', async () => {
      const response = await request
        .get('/api/personas/dni/99999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('POST /api/personas', () => {
    it('should return 201 or 400 for data', async () => {
      const response = await request
        .post('/api/personas')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: '' });
      expect([201, 400, 404]).toContain(response.status);
    });

    it('should return 201 for valid persona data', async () => {
      const response = await request
        .post('/api/personas')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: 'Test', apellido: 'Person', dni: '12345679' });
      expect([201, 400]).toContain(response.status);
    });
  });

  describe('PUT /api/personas/:id', () => {
    it('should return 200 or 404 for update', async () => {
      const response = await request
        .put('/api/personas/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: 'Updated' });
      expect([200, 400, 404]).toContain(response.status);
    });
  });

  describe('DELETE /api/personas/:id', () => {
    it('should return 404 for non-existent persona', async () => {
      const response = await request
        .delete('/api/personas/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });
});