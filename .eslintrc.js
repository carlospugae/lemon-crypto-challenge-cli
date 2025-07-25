import pluginQuery from '@tanstack/eslint-plugin-query';

module.exports = {
  root: true,
  extends: '@react-native',
  plugins: {
    '@tanstack/query': pluginQuery,
  },
  rules: {
    '@tanstack/query/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
