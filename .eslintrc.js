module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['standard', 'plugin:vue/essential'],
  plugins: ['vue'],
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'no-labels': 'off',
    'camelcase': 'off',
    'quote-props': ['warn', 'consistent'],
    'prefer-const': 'warn',
    'dot-notation': 'off'
  }
}
