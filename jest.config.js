const preset = require('jest-preset-angular/jest-preset');
module.exports = {
    ...preset,
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testMatch: ['**/*.spec.ts', '**/*.spec.js'],
    globalSetup: 'jest-preset-angular/global-setup',
    globals: {
        ...preset.globals,
        'ts-jest': {
            ...preset.globals['ts-jest'],
            tsconfig: 'src/tsconfig.test.json',
            isolatedModules: true,
        },
    },
    coverageThreshold: {
        global: {
            branches: 75,
            functions: 80,
            lines: 80,
        },
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
