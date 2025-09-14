const { configs: eslintConfigs } = require('eslint');
const tseslint = require('@typescript-eslint/eslint-plugin');
const angular = require('@angular-eslint/eslint-plugin');
const prettier = require('eslint-plugin-prettier');
const sortKeysFix = require('eslint-plugin-sort-keys-fix');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslintConfigs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      prettier,
      // 'sort-keys-fix': sortKeysFix,
    },
    rules: {
      // 'sort-keys-fix/sort-keys-fix': 'warn',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-restricted-imports': [
        'warn',
        {
          patterns: ['../*', '../../*', '../../../*', '*/*/*/*'],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    plugins: {
      prettier,
    },
    rules: {
      // Add any HTML-specific rules here
    },
  },
);
