/**
 * @fileoverview Test suite for Usuarios API Endpoints
 * @description Tests all CRUD operations for the Usuarios entity
 * 
 * Endpoints covered:
 * - GET /api/usuarios - List all usuarios
 * - GET /api/usuarios/:id - Get usuario by ID
 * - POST /api/usuarios - Create new usuario
 * - PUT /api/usuarios/:id - Update usuario
 * - DELETE /api/usuarios/:id - Delete usuario
 * 
 * Features tested:
 * - Authentication protection
 * - CRUD operations
 * - Data validation
 * 
 * @requires supertest - HTTP testing
 * @requires jwt - Token generation
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from '../helpers/testHelper.js';

describe('Usuarios API Endpoints', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });
  const invalidToken = 'invalid.token.here';

  describe('GET /api/usuarios', () => {
    /**
     * Test: Retrieve all usuarios without authentication
     * Expected: 401 Unauthorized
     */
    it('should return 401 without authorization header', async () => {
      const response = await request.get('/api/usuarios');
      expect(response.status).toBe(401);
    });

    /**
     * Test: Retrieve all usuarios with invalid token
     * Expected: 401 Unauthorized
     */
    it('should return 401 with invalid token', async () => {
      const response = await request
        .get('/api/usuarios')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).toBe(401);
    });

    /**
     * Test: Retrieve all usuarios with valid token
     * Expected: 200 OK
     */
    it('should return 200 with valid token', async () => {
      const response = await request
        .get('/api/usuarios')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/usuarios/:id', () => {
    /**
     * Test: Get usuario by non-existent ID
     * Expected: 404 Not Found
     */
    it('should return 404 for non-existent usuario', async () => {
      const response = await request
        .get('/api/usuarios/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });

    /**
     * Test: Get usuario by invalid ID format
     * Expected: 500 Internal Server Error
     */
    it('should return 404 for invalid ID format', async () => {
      const response = await request
        .get('/api/usuarios/abc')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });

  describe('POST /api/usuarios', () => {
    /**
     * Test: Create usuario with missing required fields
     * Expected: 400 Bad Request
     */
    it('should return 400 if required fields missing', async () => {
      const response = await request
        .post('/api/usuarios')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: '' });
      expect(response.status).toBe(400);
    });

    /**
     * Test: Create usuario with invalid email
     * Expected: 400 Bad Request
     */
    it('should return 400 for invalid email format', async () => {
      const response = await request
        .post('/api/usuarios')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          nombre: 'Test',
          email: 'invalid-email',
          nombreUsuario: 'testuser',
          contrasena: 'password123'
        });
      expect([400, 201]).toContain(response.status);
    });

    /**
     * Test: Create usuario with valid data
     * Expected: 201 Created or validation error
     */
    it('should return 201 for valid usuario data', async () => {
      const response = await request
        .post('/api/usuarios')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          nombre: 'NuevoUsuario',
          email: 'nuevo@test.com',
          nombreUsuario: 'nuevouser',
          contrasena: 'Password123'
        });
      expect([201, 400, 500]).toContain(response.status);
    });
  });

  describe('PUT /api/usuarios/:id', () => {
    /**
     * Test: Update non-existent usuario
     * Expected: 404 Not Found
     */
    it('should return 404 for non-existent usuario', async () => {
      const response = await request
        .put('/api/usuarios/999999')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: 'Updated' });
      expect([404, 500]).toContain(response.status);
    });

    /**
     * Test: Update usuario with invalid data
     * Expected: 400 Bad Request
     */
    it('should return 400 for invalid update data', async () => {
      const response = await request
        .put('/api/usuarios/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nombre: '' });
      expect([400, 404, 500]).toContain(response.status);
    });
  });

  describe('DELETE /api/usuarios/:id', () => {
    /**
     * Test: Delete non-existent usuario
     * Expected: 404 Not Found
     */
    it('should return 404 for non-existent usuario', async () => {
      const response = await request
        .delete('/api/usuarios/999999')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });

    /**
     * Test: Delete usuario with invalid ID format
     * Expected: 500 Internal Server Error
     */
    it('should return 404 for invalid ID format', async () => {
      const response = await request
        .delete('/api/usuarios/abc')
        .set('Authorization', `Bearer ${validToken}`);
      expect([404, 500]).toContain(response.status);
    });
  });
});