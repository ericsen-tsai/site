import type { Linter } from "eslint";

import { turboPlugin } from "../plugins";

export const turbo: Linter.Config[] = [
  {
    name: "erichandsen:turbo",
    plugins: {
      turbo: turboPlugin as unknown as Record<string, unknown>
    },
    rules: {
      ...(turboPlugin.configs.recommended.rules as Linter.Config["rules"])
    }
  }
];
