import globals from 'globals'
import js from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    ignores: ['dist/**', 'build/**'],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      sourceType: 'commonjs',
      globals: {
        ...globals.node
      },
      ecmaVersion: 'latest'
    },
    rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off'
    }
  },
  prettierPlugin.configs.flat.recommended
]
