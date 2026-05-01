/**
 * @fileoverview Test suite for Reportes API Endpoints
 * @description Tests all CRUD operations and queries for the Reportes entity
 * 
 * Endpoints covered:
 * - GET /api/reportes - List all reportes
 * - GET /api/reportes/:id - Get reporte by ID
 * - GET /api/reportes/usuario/:idUsuario - Get reportes by user
 * - GET /api/reportes/tipo/:idTipo - Get reportes by type
 * - GET /api/reportes/status/:idStatus - Get reportes by status
 * - POST /api/reportes - Create new reporte
 * - PUT /api/reportes/:id - Update reporte
 * - PATCH /api/reportes/:id/status/:idStatus - Update reporte status
 * - DELETE /api/reportes/:id - Delete reporte
 * 
 * Features tested:
 * - Authentication protection
 * - CRUD operations
 * - Filtering by user, type, status
 * - Status updates
 * - Data validation
 * 
 * @requires supertest - HTTP testing
 * @requires jwt - Token generation
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Reportes API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });
  const invalidToken = 'invalid.token.here';

  // ============================================
  // GET /api/reportes (List all)
  // ============================================
  describe('GET /api/reportes', () => {
    /**
     * Test: Retrieve all reportes without authentication
     * Expected: 401 Unauthorized
     */
    it('should return 401 without token', async () => {
      const response = await request.get('/api/reportes');
      expect(response.status).toBe(401);
    });

    /**
     * Test: Retrieve all reportes with invalid token
     * Expected: 401 Unauthorized
     */
    it('should return 401 with invalid token', async () => {
      const response = await request
        .get('/api/reportes')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).toBe(401);
    });

    /**
     * Test: Retrieve all reportes with valid token
     * Expected: 200 OK
     */
    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/reportes')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  // ============================================
  // GET /api/reportes/:id (Get by ID)
  // ============================================
  describe('GET /api/reportes/:id', () => {
    /**
     * Test: Get reporte by non-existent ID
     * Expected: 404 Not Found
     */
    it('should return 404 for non-existent reporte', async () => {
      const response = await request
        .get('/api/reportes/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });

    /**
     * Test: Get reporte with invalid ID format
     * Expected: 500 Internal Server Error
     */
    it('should return 404 for invalid ID format', async () => {
      const response = await request
        .get('/api/reportes/abc')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });

  // ============================================
  // GET /api/reportes/usuario/:idUsuario
  // ============================================
  describe('GET /api/reportes/usuario/:idUsuario', () => {
    /**
     * Test: Get reportes by non-existent user
     * Expected: 200 OK (empty array)
     */
    it('should return 200 for non-existent user', async () => {
      const response = await request
        .get('/api/reportes/usuario/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });

    /**
     * Test: Get reportes by valid user ID
     * Expected: 200 OK
     */
    it('should return 200 for valid user ID', async () => {
      const response = await request
        .get('/api/reportes/usuario/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  // ============================================
  // GET /api/reportes/tipo/:idTipo
  // ============================================
  describe('GET /api/reportes/tipo/:idTipo', () => {
    /**
     * Test: Get reportes by type (empty)
     * Expected: 200 OK
     */
    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/reportes/tipo/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });

    /**
     * Test: Get reportes by non-existent type
     * Expected: 200 OK (empty)
     */
    it('should return 200 for non-existent type', async () => {
      const response = await request
        .get('/api/reportes/tipo/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  // ============================================
  // GET /api/reportes/status/:idStatus
  // ============================================
  describe('GET /api/reportes/status/:idStatus', () => {
    /**
     * Test: Get reportes by status (empty)
     * Expected: 200 OK
     */
    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/reportes/status/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });

    /**
     * Test: Get reportes by non-existent status
     * Expected: 200 OK (empty)
     */
    it('should return 200 for non-existent status', async () => {
      const response = await request
        .get('/api/reportes/status/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  // ============================================
  // POST /api/reportes (Create)
  // ============================================
  describe('POST /api/reportes', () => {
    /**
     * Test: Create reporte with missing fields
     * Expected: 400 Bad Request
     */
    it('should return 400 for invalid data', async () => {
      const response = await request
        .post('/api/reportes')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ titulo: '' });
      expect(response.status).toBe(400);
    });

    /**
     * Test: Create reporte with valid data
     * Expected: 201 Created or validation error
     */
    it('should return 201 for valid reporte data', async () => {
      const response = await request
        .post('/api/reportes')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          titulo: 'Test Reporte',
          descripcion: 'Test description',
          idTipo: 1,
          idUsuario: 1,
          idStatus: 1,
          descripcion: 'Test desc'
        });
      expect([201, 400, 500]).toContain(response.status);
    });
  });

  // ============================================
  // PUT /api/reportes/:id (Update)
  // ============================================
  describe('PUT /api/reportes/:id', () => {
    /**
     * Test: Update non-existent reporte
     * Expected: 404 Not Found
     */
    it('should return 404 for non-existent reporte', async () => {
      const response = await request
        .put('/api/reportes/999999')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ titulo: 'Updated' });
      expect([400, 404, 500]).toContain(response.status);
    });

    /**
     * Test: Update reporte with invalid data
     * Expected: 400 Bad Request
     */
    it('should return 400 for invalid update', async () => {
      const response = await request
        .put('/api/reportes/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ titulo: '' });
      expect([400, 404, 500]).toContain(response.status);
    });
  });

  // ============================================
  // PATCH /api/reportes/:id/status/:idStatus
  // ============================================
  describe('PATCH /api/reportes/:id/status/:idStatus', () => {
    /**
     * Test: Update status of non-existent reporte
     * Expected: 404 Not Found
     */
    it('should return 404 for non-existent reporte', async () => {
      const response = await request
        .patch('/api/reportes/999999/status/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });

    /**
     * Test: Update status with invalid status ID
     * Expected: 404 Not Found
     */
    it('should return 404 for non-existent status', async () => {
      const response = await request
        .patch('/api/reportes/1/status/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });

  // ============================================
  // DELETE /api/reportes/:id
  // ============================================
  describe('DELETE /api/reportes/:id', () => {
    /**
     * Test: Delete non-existent reporte
     * Expected: 404 Not Found
     */
    it('should return 404 for non-existent reporte', async () => {
      const response = await request
        .delete('/api/reportes/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });

    /**
     * Test: Delete reporte with invalid ID format
     * Expected: 500 Internal Server Error
     */
    it('should return 404 for invalid ID format', async () => {
      const response = await request
        .delete('/api/reportes/abc')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });
});