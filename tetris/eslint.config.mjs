import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";


export default defineConfig([
  { files: ["./src/**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"]
    // ,rules{
    // "array-callback-return": "off",
    // }
    },
  { files: ["./src/**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["./src/**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["./src/**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"],eslintPluginPrettierRecommended },
  { files: ["./src/**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },
]);
