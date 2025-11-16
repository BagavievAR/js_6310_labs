import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactPlugin from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist', 'coverage', 'node_modules'],
  },

  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: reactPlugin,
      import: importPlugin,
    },
    rules: {
      'no-var': 'error',
      'no-undef': 'error',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      indent: [
        'error',
        2,
        {
          FunctionDeclaration: { parameters: 'first' },
          MemberExpression: 2,
          SwitchCase: 1,
        },
      ],

      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      semi: ['error', 'never'],
      'no-trailing-spaces': 'error',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react-refresh/only-export-components': 'warn',
    },
  },

  {
    files: ['tests/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
  },
])
