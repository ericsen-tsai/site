import type { Linter } from "eslint";

import { unicornPlugin } from "../plugins";

export const unicorn: Linter.Config[] = [
  {
    name: "erichandsen:unicorn",
    plugins: {
      unicorn: unicornPlugin
    },
    rules: {
      ...unicornPlugin.configs.recommended.rules,
      "unicorn/no-await-expression-member": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-export-from": ["error", { ignoreUsedVariables: true }],
      "unicorn/prevent-abbreviations": "off",
      "unicorn/prefer-global-this": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-method-this-argument": "off",
      "unicorn/no-array-push-push": "off"
    }
  }
];
