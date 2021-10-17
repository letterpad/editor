module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    // "prettier",
    "plugin:@typescript-eslint/recommended",
    // "plugin:react/recommended",
    // "prettier/@typescript-eslint",
    // "plugin:import/warnings",
    // "plugin:import/typescript",
    // "plugin:react-hooks/recommended",
  ],
  plugins: [],
  //   plugins: ["prettier", "babel", "deprecate", "react-hooks"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "import/no-duplicates": "off",
  },
};
