module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "import"
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ["node_modules/"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "sort-imports": [
      "warn",
      {
        "ignoreDeclarationSort": true
      }
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        "pathGroupsExcludedImportTypes": ["builtin"],
        "alphabetize": {
          "order": "asc"
        },
      }
    ]
  },
};
