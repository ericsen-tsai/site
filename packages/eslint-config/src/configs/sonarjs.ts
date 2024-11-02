import type { Linter } from "eslint";

import { sonarjsPlugin } from "../plugins";

export const sonarjs: Linter.Config[] = [
  {
    name: "erichandsen:sonarjs",
    plugins: {
      sonarjs: sonarjsPlugin as unknown as Record<string, unknown>
    },
    rules: {
      ...sonarjsPlugin.configs.recommended.rules,
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/sonar-prefer-read-only-props": "off",
      "sonarjs/no-unstable-nested-components": "off",
      "sonarjs/no-misused-promises": "off",
      "sonarjs/different-types-comparison": "off",
      "sonarjs/no-nested-assignment": "off"
    }
  }
];
