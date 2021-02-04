const preset = require('jest-preset-angular/jest-preset');
module.exports = {
    ...preset,
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: [
        '<rootDir>/node_modules/jest-preset-angular/build/setup-jest.js',
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
};
