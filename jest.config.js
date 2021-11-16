const preset = require('jest-preset-angular/jest-preset');
module.exports = {
    ...preset,
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: [
        '<rootDir>/node_modules/jest-preset-angular/build/config/setup-jest.js',
    ],
    testMatch: ['**/*.spec.ts', '**/*.spec.js'],
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
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
