import type { Config } from 'jest';

const config: Config = {
    collectCoverage: true,
    coverageReporters: ['html'],
    preset: 'jest-preset-angular',
    moduleNameMapper: {
        '^primeng/(.*)': '<rootDir>/packages/primeng/src/$1/public_api'
    },
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
};

export default config;
