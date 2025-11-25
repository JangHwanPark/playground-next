import type { StorybookConfig } from '@storybook/nextjs';
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {},

  // webpackFinal 설정 추가
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // process.cwd() -> 프로젝트 루트
        "@": path.resolve(process.cwd(), "src"),
      };
    }
    return config;
  },

  // 크로스 플랫폼 호환 (\\ -> /)
  staticDirs: ['../public'],
};
export default config;
