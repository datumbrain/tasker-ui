/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    node: true
  },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 0,
    'vue/no-unused-vars': 0
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
