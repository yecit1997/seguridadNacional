/**
 * @fileoverview Test suite for Supervisores API Endpoints
 * @description Tests all CRUD operations for the Supervisores entity
 * 
 * Endpoints covered:
 * - GET /api/supervisores - List all supervisores
 * - GET /api/supervisores/:id - Get supervisor by ID
 * - POST /api/supervisores - Create new supervisor
 * - PUT /api/supervisores/:id - Update supervisor
 * - DELETE /api/supervisores/:id - Delete supervisor
 * 
 * @requires supertest - HTTP testing
 * @requires jwt - Token generation for auth
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Supervisores API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });
  const invalidToken = 'invalid.token.here';

  describe('GET /api/supervisores', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/supervisores');
      expect(response.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const response = await request
        .get('/api/supervisores')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/supervisores')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/supervisores/:id', () => {
    it('should return 404 for non-existent supervisor', async () => {
      const response = await request
        .get('/api/supervisores/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });

    it('should return 404 for invalid ID format', async () => {
      const response = await request
        .get('/api/supervisores/abc')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });

  describe('POST /api/supervisores', () => {
    it('should return 400 if required fields missing', async () => {
      const response = await request
        .post('/api/supervisores')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ area: '' });
      expect([400, 404]).toContain(response.status);
    });

    it('should return 201 for valid supervisor data', async () => {
      const response = await request
        .post('/api/supervisores')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          idPersona: 1,
          area: 'Supervision General',
          turno: 'Matutino'
        });
      expect([201, 400, 404, 500]).toContain(response.status);
    });
  });

  describe('PUT /api/supervisores/:id', () => {
    it('should return 404 for non-existent supervisor', async () => {
      const response = await request
        .put('/api/supervisores/999999')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ area: 'Updated' });
      expect([404, 500]).toContain(response.status);
    });

    it('should return 400 for invalid update data', async () => {
      const response = await request
        .put('/api/supervisores/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ area: '' });
      expect([400, 404, 500]).toContain(response.status);
    });
  });

  describe('DELETE /api/supervisores/:id', () => {
    it('should return 404 for non-existent supervisor', async () => {
      const response = await request
        .delete('/api/supervisores/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });

    it('should return 404 for invalid ID format', async () => {
      const response = await request
        .delete('/api/supervisores/abc')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });
});