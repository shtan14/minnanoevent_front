module.exports = {
  root: true,
  env: {
    browser: true,
    "jest/globals": true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended", "prettier"],
  plugins: ["jest"],

  rules: {
    quotes: ["error", "double"],
    "no-console": "off",
    "no-unused-vars": "off",
  },
};
