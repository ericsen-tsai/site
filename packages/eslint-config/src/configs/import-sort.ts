import type { Linter } from "eslint";

import { simpleImportSortPlugin } from "../plugins";

export const importSort: Linter.Config[] = [
  {
    name: "erichandsen:import-sort",
    plugins: {
      "simple-import-sort": simpleImportSortPlugin
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [[String.raw`^@?\w`], [String.raw`^[\w]`], ["^"], [String.raw`^\.`]]
        }
      ],
      "simple-import-sort/exports": "error"
    }
  }
];
