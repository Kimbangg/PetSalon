module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier'],
  rules: {
    'object-curly-newline': 0,
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-alert': 'off',
    'no-useless-escape': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'dot-notation': 'off',
    'no-underscore-dangle': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-children-prop': 'off',
  },
};
