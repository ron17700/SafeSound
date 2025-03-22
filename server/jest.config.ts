import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.ts'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'index.ts',
        'Image-fetcher.ts',
        'speechmatics.service.ts',
        'passport.ts',
    ],
    testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],
};

export default config;
