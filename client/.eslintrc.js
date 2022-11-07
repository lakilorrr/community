module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaFeatures": {
        "jsx": true
    },
    "ecmaVersion": 'latest',
    "sourceType": "module",
},
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  overrides: [
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-key": 2,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
