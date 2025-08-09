import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 启用 ESLint 的推荐配置
  eslint.configs.recommended,
  // 启用 typescript-eslint 的推荐配置
  ...tseslint.configs.recommended,
);