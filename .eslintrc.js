module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true,
  },
  extends: [ 'plugin:vue/essential' ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: [ 'warn', 'single' ],
    'comma-dangle': [ 'warn', 'always-multiline' ],
    'array-bracket-spacing': [ 'warn', 'always' ],
    'object-curly-spacing': [ 'warn', 'always' ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  
};
