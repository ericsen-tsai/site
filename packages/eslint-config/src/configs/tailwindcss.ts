import type { Linter } from "eslint";

import { tailwindcssPlugin } from "../plugins";

export const tailwindcss: Linter.Config[] = [
  {
    name: "erichandsen:tailwindcss",
    plugins: {
      tailwindcss: tailwindcssPlugin
    },
    rules: {
      ...tailwindcssPlugin.configs.recommended.rules,

      // Done by Prettier
      "tailwindcss/classnames-order": "off",
      // Turn off due to poor performance
      "tailwindcss/no-custom-classname": "off"
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"]
      }
    }
  }
];
