require('dotenv').config();
const express       = require('express');
const swaggerUi     = require('swagger-ui-express');
const swaggerSpec   = require('./config/swagger');
const routes        = require('./routes/index');
const sequelize     = require('./config/database');
const { errorHandler, notFound } = require('./middleware/response');

const app  = express();
const PORT = process.env.PORT || 8080;

// ── Middlewares ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Swagger ───────────────────────────────────────────────────
app.use('/api/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/v3/api-docs', (req, res) => res.json(swaggerSpec));

// ── Rutas ─────────────────────────────────────────────────────
app.use('/api', routes);

// ── 404 y manejo de errores ───────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Conectar BD y levantar servidor ──────────────────────────
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a MySQL exitosa');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📄 Swagger UI:  http://localhost:${PORT}/api/swagger-ui`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MySQL:', err.message);
    process.exit(1);
  });
