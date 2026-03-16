const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Seguridad Nacional',
      version: '1.0.0',
      description: 'API REST para el sistema de gestión de seguridad nacional',
    },
    servers: [{ url: '/api' }],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
