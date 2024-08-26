/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    rootDir: __dirname,
    preset: 'ts-jest',
    globals: { fetch },
    setupFiles: ['./jest.polyfills.js', './setupEnvVar.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
    transform: {
      ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    transformIgnorePatterns: ['/node_modules/']
};