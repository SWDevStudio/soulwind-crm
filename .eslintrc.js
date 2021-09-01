module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "prettier",
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-throw-literal": "off",
    "vue/valid-v-slot": ["error", {
      allowModifiers: true,
    }],
  },
}
