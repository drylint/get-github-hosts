module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'better',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
