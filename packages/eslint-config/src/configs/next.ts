import type { Linter } from "eslint";

import { nextPlugin } from "../plugins";

export const next: Linter.Config[] = [
  {
    name: "erichandsen:next",
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      "@next/next/no-html-link-for-pages": "off"
    }
  }
];
