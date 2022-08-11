module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'arrow-spacing': 'error',
    // 'no-console': 'error',
  },
  extends: [
    // 'some-other-config-you-use',
    'prettier',
    'react-app',
    'react-app/jest',
    'eslint:recommended',
  ],
};
