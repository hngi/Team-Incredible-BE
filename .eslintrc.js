module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
<<<<<<< HEAD
  extends: [
    'airbnb-base',
  ],
=======
  extends: ['airbnb-base'],
>>>>>>> 90500199c41818a7d219beaffa76d4ba54fff2ba
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
<<<<<<< HEAD
    'no-console': ['warn', { allow: ['clear', 'info', 'error', 'dir', 'trace', 'log'] }],
=======
    'no-console': [
      'warn',
      { allow: ['clear', 'info', 'error', 'dir', 'trace', 'log'] },
    ],
>>>>>>> 90500199c41818a7d219beaffa76d4ba54fff2ba
    curly: 'error',
    'no-else-return': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'prefer-arrow-callback': 'error',
    strict: 'error',
    'symbol-description': 'error',
    yoda: ['error', 'never', { exceptRange: true }],
  },
};
