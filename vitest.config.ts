import {defineConfig} from "vitest/config";
import * as path from "node:path";

export default defineConfig({
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/shared/test/setup-tests.ts"],
        include: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});