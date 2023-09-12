"use strict";

module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:n/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "script",
  },
  plugins: ["prettier"],
  root: true,
  rules: {
    strict: "error",
  },
};
