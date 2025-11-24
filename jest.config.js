module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/_tests_/controladoresTest/*.test.ts', '**/_tests_/modelosTest/*.test.ts'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};