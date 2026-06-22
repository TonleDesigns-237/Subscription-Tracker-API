import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      // Add your custom rules here
      "no-console": "off",           // Allow console.log (good for backend)
      "no-unused-vars": "warn",      // Warn about unused variables
      "semi": ["error", "always"],   // Require semicolons
      "quotes": ["error", "single"], // Use single quotes
    }
  }
]);