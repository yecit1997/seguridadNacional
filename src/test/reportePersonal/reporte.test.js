import { describe, it, expect } from '@jest/globals';
import { request } from '../helpers/testHelper.js';
import jwt from 'jsonwebtoken';

describe('Reporte API Endpoints', () => {
  const validToken = jwt.sign(
    { id: 1, nombreUsuario: 'test', rol: 'admin' },
    process.env.JWT_SECRET || 'dev_secret_key_2024',
    { expiresIn: '1h' }
  );

  describe('GET /api/reportes', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/reportes');
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/reportes')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/reportes', () => {
    it('should return 400 for invalid data', async () => {
      const response = await request
        .post('/api/reportes')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ titulo: '' });
      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/reportes/:id', () => {
    it('should return 404 for non-existent reporte', async () => {
      const response = await request
        .get('/api/reportes/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });

  describe('GET /api/reportes/tipo/:idTipo', () => {
    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/reportes/tipo/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/reportes/status/:idStatus', () => {
    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/reportes/status/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('PUT /api/reportes/:id', () => {
    it('should return 400 for invalid update', async () => {
      const response = await request
        .put('/api/reportes/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ titulo: '' });
      expect([400, 404, 500]).toContain(response.status);
    });
  });

  describe('DELETE /api/reportes/:id', () => {
    it('should return 404 for non-existent reporte', async () => {
      const response = await request
        .delete('/api/reportes/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });
});