module.exports = {
  overrides: [
    {
      files: ['**/__tests__/**/*.test.ts'],
      extends: ['plugin:testing-library/react'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
