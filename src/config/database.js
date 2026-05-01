import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

let dbDir;
let dbPath;

if (process.env.NODE_ENV === 'test') {
  dbPath = ':memory:';
} else if (process.env.DB_DIALECT === 'sqlite' || process.env.NODE_ENV === 'development') {
  dbDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const dbFile = process.env.DB_NAME || 'seguridad.db';
  dbPath = path.join(dbDir, dbFile.endsWith('.sqlite') ? dbFile : dbFile + '.sqlite');
} else {
  dbPath = null;
}

let sequelizeConfig;

if (process.env.NODE_ENV === 'test') {
  sequelizeConfig = {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  };
} else if (process.env.DB_DIALECT === 'sqlite' || process.env.NODE_ENV === 'development') {
  sequelizeConfig = {
    dialect: 'sqlite',
    storage: dbPath,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  };
} else {
  sequelizeConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  };
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  sequelizeConfig
);

export default sequelize;