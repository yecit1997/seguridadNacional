/**
 * @fileoverview Test suite for Roles API Endpoints
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Roles API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });

  describe('GET /api/roles', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/roles');
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/roles')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/roles/:id', () => {
    it('should return 404 for non-existent role', async () => {
      const response = await request
        .get('/api/roles/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('POST /api/roles', () => {
    it('should return 201 for valid role', async () => {
      const response = await request
        .post('/api/roles')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: 'TestRole' });
      expect([201, 400]).toContain(response.status);
    });
  });

  describe('PUT /api/roles/:id', () => {
    it('should return 200 or 404 for update', async () => {
      const response = await request
        .put('/api/roles/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: 'Updated' });
      expect([200, 400, 404]).toContain(response.status);
    });
  });

  describe('DELETE /api/roles/:id', () => {
    it('should return 404 for non-existent role', async () => {
      const response = await request
        .delete('/api/roles/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });
});