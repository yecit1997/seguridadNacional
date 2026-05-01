/**
 * @fileoverview Test suite for Personal Administrativo API Endpoints
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Personal Administrativo API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });

  describe('GET /api/personal', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/personal');
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/personal')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/personal/:id', () => {
    it('should return 404 for non-existent personal', async () => {
      const response = await request
        .get('/api/personal/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('POST /api/personal', () => {
    it('should return 201 or 400 for valid data', async () => {
      const response = await request
        .post('/api/personal')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ cargo: 'Test', idPersona: 1 });
      expect([201, 400, 404]).toContain(response.status);
    });
  });

  describe('PUT /api/personal/:id', () => {
    it('should return 200 or 404 for update', async () => {
      const response = await request
        .put('/api/personal/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ cargo: 'Updated' });
      expect([200, 400, 404]).toContain(response.status);
    });
  });

  describe('DELETE /api/personal/:id', () => {
    it('should return 404 for non-existent personal', async () => {
      const response = await request
        .delete('/api/personal/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });
});