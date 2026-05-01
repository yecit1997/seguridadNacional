export default {
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/test/'],
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],
  testTimeout: 30000
};