import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    files: ["**/*.js", "**/*.jsx"],
    extends: [
      compat.extends("eslint:recommended", "plugin:react/recommended"),
      prettierConfig
    ],

    plugins: {
      react,
      "react-native": reactNative,
      prettier,
    },

    languageOptions: {
      globals: {
        ...reactNative.environments["react-native"]["react-native"],
      },
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: [
            "@babel/preset-react",
            "babel-preset-expo"
          ],
        },
        requireConfigFile: false,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
    },
  },
]);
