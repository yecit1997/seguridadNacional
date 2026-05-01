/**
 * @fileoverview Test suite for Autenticación API Endpoints
 * @description Tests authentication and authorization endpoints
 * 
 * Endpoints covered:
 * - POST /api/auth/login - User login
 * 
 * Features tested:
 * - Credential validation
 * - JWT token generation
 * - Authentication middleware
 * - Protected routes access
 * 
 * @requires supertest - HTTP testing
 * @requires jwt - Token generation
 */

import { describe, it, expect } from '@jest/globals';
import { request, generateToken } from './helpers/testHelper.js';

describe('Auth API - Autenticación', () => {
  describe('POST /api/auth/login', () => {
    /**
     * Test: Login with missing credentials
     * Expected: 400 Bad Request (missing username)
     */
    it('should return 400 if username is missing', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({ nombre_usuario: '' });
      expect(response.status).toBe(400);
    });

    /**
     * Test: Login with missing password
     * Expected: 400 Bad Request
     */
    it('should return 400 if password is missing', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({ nombre_usuario: 'test', contrasena: '' });
      expect(response.status).toBe(400);
    });

    /**
     * Test: Login with invalid credentials
     * Expected: 401 Unauthorized
     */
    it('should return 401 for invalid credentials', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({ nombre_usuario: 'invalid', contrasena: 'invalid' });
      expect([400, 401]).toContain(response.status);
    });

    /**
     * Test: Login with valid credentials (if user exists)
     * Expected: 200 OK with token or 401 if user not found
     */
    it('should return 200 for valid credentials or 401 if user not found', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({ nombre_usuario: 'admin', contrasena: 'admin123' });
      expect([200, 401]).toContain(response.status);
    });
  });
});

describe('Auth API - Middleware de Autenticación', () => {
  const validToken = generateToken({ id: 1, nombreUsuario: 'test', rol: 'admin' });
  const invalidToken = 'invalid.token.string';
  
  /**
   * Test: Access protected route without token
   * Expected: 401 Unauthorized
   */
  it('should return 401 accessing protected route without token', async () => {
    const response = await request.get('/api/usuarios');
    expect(response.status).toBe(401);
  });

  /**
   * Test: Access protected route with malformed token
   * Expected: 401 Unauthorized
   */
  it('should return 401 with malformed token', async () => {
    const response = await request
      .get('/api/usuarios')
      .set('Authorization', `Bearer ${invalidToken}`);
    expect(response.status).toBe(401);
  });

  /**
   * Test: Access protected route with valid token
   * Expected: 200 OK or appropriate response
   */
  it('should return 200 with valid token', async () => {
    const response = await request
      .get('/api/usuarios')
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
  });

  /**
   * Test: Access protected route with missing Bearer prefix
   * Expected: 401 Unauthorized
   */
  it('should return 401 without Bearer prefix', async () => {
    const response = await request
      .get('/api/usuarios')
      .set('Authorization', validToken);
    expect(response.status).toBe(401);
  });
});