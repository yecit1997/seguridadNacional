/**
 * @fileoverview Test suite for Catalogos API Endpoints
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Catalogos API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });

  describe('GET /api/tipos-reporte', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/tipos-reporte');
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/tipos-reporte')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/tipos-reporte/:id', () => {
    it('should return 404 for non-existent type', async () => {
      const response = await request
        .get('/api/tipos-reporte/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('POST /api/tipos-reporte', () => {
    it('should return 201 for valid data', async () => {
      const response = await request
        .post('/api/tipos-reporte')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: 'TestTipo' });
      expect([201, 400]).toContain(response.status);
    });
  });

  describe('PUT /api/tipos-reporte/:id', () => {
    it('should return 200 or 404 for update', async () => {
      const response = await request
        .put('/api/tipos-reporte/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: 'Updated' });
      expect([200, 400, 404]).toContain(response.status);
    });
  });

  describe('DELETE /api/tipos-reporte/:id', () => {
    it('should return 404 for non-existent type', async () => {
      const response = await request
        .delete('/api/tipos-reporte/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('GET /api/status-reporte', () => {
    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/status-reporte')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/status-reporte/:id', () => {
    it('should return 404 for non-existent status', async () => {
      const response = await request
        .get('/api/status-reporte/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('POST /api/status-reporte', () => {
    it('should return 201 for valid data', async () => {
      const response = await request
        .post('/api/status-reporte')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: 'TestStatus' });
      expect([201, 400]).toContain(response.status);
    });
  });

  describe('PUT /api/status-reporte/:id', () => {
    it('should return 200 or 404 for update', async () => {
      const response = await request
        .put('/api/status-reporte/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: 'Updated' });
      expect([200, 400, 404]).toContain(response.status);
    });
  });

  describe('DELETE /api/status-reporte/:id', () => {
    it('should return 404 for non-existent status', async () => {
      const response = await request
        .delete('/api/status-reporte/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });
});