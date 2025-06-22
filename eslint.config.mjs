import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "prettier",
    ],
    rules: {
      // Code style
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],

      // TypeScript-specific
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-inferrable-types": "off",

      // React/Next-specific
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",

      // Import rules
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "ignore",
        },
      ],
      "import/no-unresolved": "error",
      "import/no-extraneous-dependencies": [
        "error",
        { devDependencies: ["**/*.test.ts", "**/*.spec.ts"] },
      ],

      // General best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-empty-function": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {},
      },
    },
  }),
];

export default eslintConfig;
