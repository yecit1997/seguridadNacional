import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Seguridad Nacional',
      version: '1.0.0',
      description: 'API REST para el sistema integral de gestión de seguridad nacional',
      contact: {
        name: 'SENA Seguridad Nacional',
        email: 'info@seguridadnacional.gov',
      },
    },
    servers: [
      {
        url: '/api',
        description: 'Servidor de desarrollo',
      },
      {
        url: 'http://localhost:8080/api',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT para autenticación',
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            username: { type: 'string', example: 'jdoe' },
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', format: 'password' },
            activo: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['username', 'email', 'password'],
        },
        Persona: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            dni: { type: 'string', example: '12345678' },
            nombre: { type: 'string', example: 'Juan' },
            apellido: { type: 'string', example: 'Pérez' },
            email: { type: 'string' },
            telefono: { type: 'string' },
            direccion: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Rol: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string', example: 'ADMIN' },
            descripcion: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Reporte: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            titulo: { type: 'string' },
            descripcion: { type: 'string' },
            idUsuario: { type: 'integer' },
            idTipo: { type: 'integer' },
            idStatus: { type: 'integer' },
            fechaCreacion: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Alerta: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            idUsuario: { type: 'integer' },
            mensaje: { type: 'string' },
            tipo: { type: 'string', example: 'CRITICA' },
            leida: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Vehiculo: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            placa: { type: 'string', example: 'ABC-123' },
            marca: { type: 'string', example: 'Toyota' },
            modelo: { type: 'string', example: 'Camry' },
            anio: { type: 'integer', example: 2024 },
            tipo: { type: 'string', example: 'Sedan' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Conductor: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            idPersona: { type: 'integer' },
            numeroLicencia: { type: 'string' },
            fechaVencimiento: { type: 'string', format: 'date' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

export default swaggerJsdoc(options);
