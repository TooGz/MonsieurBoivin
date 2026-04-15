import js from "@eslint/js";
import globals from "globals";

const sharedIgnores = [
  "node_modules/**",
  "public/**",
  "resources/**",
  ".hugo_cache/**",
  "themes/**",
  "reports/lighthouse/**"
];

export default [
  {
    ignores: sharedIgnores
  },
  js.configs.recommended,
  {
    files: ["scripts/**/*.mjs", "tests/**/*.mjs", "*.config.js", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      }
    },
    rules: {
      "no-console": "off"
    }
  },
  {
    files: ["assets/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "no-console": "off"
    }
  }
];
