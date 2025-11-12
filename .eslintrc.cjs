module.exports = {
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard',
    'prettier',
  ],
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: { sourceType: 'script' },
    },
  ],
  ignorePatterns: ['**/node_modules/**'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'react/prop-types': 0,
    'no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
  },
  settings: { react: { version: 'detect' } },
};
