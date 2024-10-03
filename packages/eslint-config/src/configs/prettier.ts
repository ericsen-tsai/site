import type { Linter } from "eslint";

import { prettierConfig, prettierPlugin } from "../plugins";

export const prettier: Linter.Config[] = [
  {
    name: "erichandsen:prettier",
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      // Avoid conflicts
      ...prettierConfig.rules,

      "prettier/prettier": "error",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off"
    }
  }
];
