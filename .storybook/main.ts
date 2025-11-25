import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
// import webpack from 'webpack';
// pnpm install webpack @types/webpack --save-dev

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
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
        '@': path.resolve(process.cwd(), 'src'),
      };
    }

    // DefinePlugin을 사용하여 환경 변수 Mocking 추가
    /*if (!config.plugins) {
      config.plugins = [];
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        // Supabase 클라이언트 초기화 오류를 방지하기 위해 임시 값 주입
        'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify('mock-url-for-storybook'),
        'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify('mock-key-for-storybook'),
      })
    );*/

    return config;
  },

  // 크로스 플랫폼 호환 (\\ -> /)
  staticDirs: ['../public'],
};
export default config;
