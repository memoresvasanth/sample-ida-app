module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^react(.*)$': '<rootDir>/node_modules/react$1',
    '^react-dom(.*)$': '<rootDir>/node_modules/react-dom$1',
    '^react-router-dom(.*)$': '<rootDir>/node_modules/react-router-dom$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};