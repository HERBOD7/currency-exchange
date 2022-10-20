module.exports = {
  env: {
    es6: true,
    node: true,
  },
  plugins: ['import'],
  extends: ['react-app', 'plugin:prettier/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
  },
};
