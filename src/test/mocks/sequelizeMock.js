import { jest } from '@jest/globals';

const mockFindAll = jest.fn().mockResolvedValue([]);
const mockFindOne = jest.fn().mockResolvedValue(null);
const mockFindByPk = jest.fn().mockResolvedValue(null);
const mockCreate = jest.fn().mockResolvedValue({ id: 1 }),
const mockUpdate = jest.fn().mockResolvedValue([1]),
const mockDestroy = jest.fn().mockResolvedValue(1);

const mockSequelize = {
  authenticate: jest.fn().mockResolvedValue(),
  sync: jest.fn().mockResolvedValue(),
  models: {
    Usuario: {
      findAll: mockFindAll,
      findOne: mockFindOne,
      findByPk: mockFindByPk,
      create: mockCreate
    },
    Reporte: {
      findAll: mockFindAll,
      findOne: mockFindOne,
      findByPk: mockFindByPk,
      create: mockCreate,
      update: mockUpdate,
      destroy: mockDestroy
    }
  }
};

jest.unstable_mockModule('sequelize', () => ({
  default: mockSequelize,
  DataTypes: { INTEGER: 'INTEGER', STRING: 'STRING', DATE: 'DATE' }
}));

jest.unstable_mockModule('../config/database.js', () => ({
  default: mockSequelize
}));

export { mockSequelize, mockFindAll, mockFindOne, mockFindByPk, mockCreate, mockUpdate, mockDestroy };