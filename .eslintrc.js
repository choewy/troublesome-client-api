module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['import'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': [
      'error',
      {
        code: 160,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent', 'index'], 'type', 'unknown'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
