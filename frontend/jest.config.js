/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    rootDir: __dirname,
    preset: 'ts-jest',
    globals: { fetch },
    setupFiles: ['<rootDir>/jest.polyfills.js', '<rootDir>/setupEnvVar.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
    moduleNameMapper: {
      "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
    transformIgnorePatterns: ['/node_modules/']
};