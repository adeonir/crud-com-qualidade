module.exports = {
  root: true,
  extends: ['custom/next', 'plugin:chai-friendly/recommended', 'plugin:cypress/recommended'],
  plugins: ['cypress', 'chai-friendly', 'no-only-tests'],
  rules: {
    'no-only-tests/no-only-tests': 'error',
  },
  overrides: [
    {
      files: ['src/app/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
}
