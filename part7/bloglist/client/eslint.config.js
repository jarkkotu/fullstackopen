import globals from 'globals'
import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['dist/**', 'build/**'],
    ...reactPlugin.configs.flat.recommended,
    settings: { react: { version: 'detect' } },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
      ecmaVersion: 'latest'
    },
    plugins: { reactPlugin, prettierPlugin },
    rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      'no-unused-vars': 'off'
    }
  },
  prettierPluginRecommended
]
