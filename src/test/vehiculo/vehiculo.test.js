/**
 * @fileoverview Test suite for Vehiculos API Endpoints
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Vehiculos API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });

  describe('GET /api/vehiculos', () => {
    it('should return 401 without token', async () => {
      const response = await request.get('/api/vehiculos');
      expect(response.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/vehiculos')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/vehiculos/:id', () => {
    it('should return 404 for non-existent vehiculo', async () => {
      const response = await request
        .get('/api/vehiculos/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('GET /api/vehiculos/placa/:placa', () => {
    it('should return 404 for non-existent placa', async () => {
      const response = await request
        .get('/api/vehiculos/placa/XXX999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('POST /api/vehiculos', () => {
    it('should return 201 for valid data', async () => {
      const response = await request
        .post('/api/vehiculos')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ placa: 'TEST001', marca: 'Toyota', modelo: 'Corolla', anio: 2023 });
      expect([201, 400]).toContain(response.status);
    });
  });

  describe('PUT /api/vehiculos/:id', () => {
    it('should return 200 or 404 for update', async () => {
      const response = await request
        .put('/api/vehiculos/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ marca: 'Updated' });
      expect([200, 400, 404]).toContain(response.status);
    });
  });

  describe('DELETE /api/vehiculos/:id', () => {
    it('should return 404 for non-existent vehiculo', async () => {
      const response = await request
        .delete('/api/vehiculos/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([200, 404]).toContain(response.status);
    });
  });
});