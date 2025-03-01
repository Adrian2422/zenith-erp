import importPlugin from 'eslint-plugin-import';

import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    // config for eslint-plugin-import only
    ...importPlugin.flatConfigs.recommended,
    ...importPlugin.flatConfigs.typescript,
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
        typescript: true,
      },
    },
    rules: {
      /// you can customize it as needed
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          '': 'never',
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: [
            'classProperty',
            'typeProperty',
            'classMethod',
            'objectLiteralMethod',
            'typeMethod',
            'accessor',
          ],
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['enumMember'],
          format: ['PascalCase'],
        },
      ],
      complexity: 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'angle-bracket',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          ignoredMethodNames: ['constructor'],
        },
      ],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      'operator-linebreak': ['error', 'before'],
      '@typescript-eslint/no-use-before-define': 'error',
      'brace-style': ['error', '1tbs'],
      'id-blacklist': 'error',
      'id-match': 'error',
      semi: ['error', 'always'],
      quotes: ['warn', 'single'],
      'max-len': [
        'error',
        {
          ignorePattern: '^import ',
          code: 140,
        },
      ],
      'no-console': 'warn',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'no-new-wrappers': 'error',
      'no-throw-literal': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': ['warn'],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'no-lonely-if': 'error',
      'no-mixed-operators': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-nested-ternary': 'error',
      'no-new-object': 'error',
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'consistent-return': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'no-trailing-spaces': 'error',
      'no-unneeded-ternary': 'error',
      'no-constructor-return': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'arrow-body-style': 'off',
      'guard-for-in': 'off',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      curly: 'error',
      'no-multi-spaces': 'error',
      'no-eval': 'error',
      'no-lone-blocks': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'default-case': 'error',
      'object-shorthand': 'off',
      'prefer-arrow/prefer-arrow-functions': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'continue',
        },
      ],
    },
  },
];
