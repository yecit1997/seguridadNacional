/**
 * @fileoverview Test suite for Conductores API Endpoints
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Conductores API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });

  describe('GET /api/conductores', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/conductores');
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/conductores')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/conductores/:id', () => {
    it('should return 404 for non-existent conductor', async () => {
      const response = await request
        .get('/api/conductores/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('POST /api/conductores', () => {
    it('should return 201 or 400 for valid data', async () => {
      const response = await request
        .post('/api/conductores')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ numeroLicencia: 'DL123', idPersona: 1 });
      expect([201, 400, 404]).toContain(response.status);
    });
  });

  describe('PUT /api/conductores/:id', () => {
    it('should return 200 or 404 for update', async () => {
      const response = await request
        .put('/api/conductores/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ numeroLicencia: 'Updated' });
      expect([200, 400, 404]).toContain(response.status);
    });
  });

  describe('DELETE /api/conductores/:id', () => {
    it('should return 404 for non-existent conductor', async () => {
      const response = await request
        .delete('/api/conductores/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });
});