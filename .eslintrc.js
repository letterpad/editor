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
  plugins: ["import"],
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
    "import/no-unresolved": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
