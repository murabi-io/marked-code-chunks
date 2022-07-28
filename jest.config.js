/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
};