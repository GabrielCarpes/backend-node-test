"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("ts-jest");
const tsconfig_json_1 = require("./tsconfig.json");
const config = {
    moduleFileExtensions: ["js", "json", "ts"],
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "./src/modules/**/application/services/*.ts",
        "./src/modules/**/application/useCases/*.ts",
        "!./src/main.ts",
        "!./src/exceptions.filter.ts",
        "./src/modules/**/*Error.ts",
    ],
    coveragePathIgnorePatterns: ["<rootDir>/dist/"],
    coverageDirectory: "coverage",
    testMatch: ["**/*.test.ts", "**/*.e2e-spec.ts", "**/*.spec.ts"],
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    coverageProvider: "v8",
    coverageReporters: ["json", "text", "lcov", "clover", "text-summary"],
    moduleNameMapper: (0, ts_jest_1.pathsToModuleNameMapper)(tsconfig_json_1.compilerOptions.paths, {
        prefix: "<rootDir>/",
    }),
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    testEnvironment: "node",
    resetMocks: true,
    rootDir: "./",
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map