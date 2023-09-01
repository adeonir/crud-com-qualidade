module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    react: {
      version: "detect"
    },
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier",
    "import"
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ["node_modules/"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/display-name": "off",
    "react/no-unknown-property": ["error", { "ignore": ["jsx", "global"] }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
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
