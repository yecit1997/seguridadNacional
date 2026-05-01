import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

import swaggerSpec from './src/config/swagger.js';
import routes from './src/routes/index.js';
import sequelize from './src/config/database.js';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';
import { authMiddleware } from './src/middleware/authMiddleware.js';
import { seedData } from './src/config/seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Tiempo de espera para la conexión a la base de datos (10 segundos)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Demasiadas peticiones desde esta IP, intente nuevamente en 1 minutos.',
  },
});

const corsOptions = {
  origin: (origin, callback) => {
    const allowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5173').split(',');
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origen no permitido → ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(limiter);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/v3/api-docs', (req, res) => res.json(swaggerSpec));

app.use('/api', (req, res, next) => {
  const publicPaths = ['/auth/login', '/swagger-ui', '/v3/api-docs'];
  if (publicPaths.some(path => req.path.startsWith(path))) {
    return next();
  }
  return authMiddleware(req, res, next);
}, routes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a Base de Datos (MySQL) establecida');
    
    await sequelize.sync({ alter: false }); 
    console.log('✅ Tablas sincronizadas correctamente');

    await seedData();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado en: http://localhost:${PORT}`);
      console.log(`📄 Documentación API: http://localhost:${PORT}/api/swagger-ui`);
      console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Error crítico al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

export default app;

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
