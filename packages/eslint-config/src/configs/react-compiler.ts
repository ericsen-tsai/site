import type { Linter } from "eslint";

import { reactCompilerPlugin } from "../plugins";

export const reactCompiler: Linter.Config[] = [
  {
    plugins: {
      "react-compiler": reactCompilerPlugin
    },
    rules: {
      "react-compiler/react-compiler": "error"
    }
  }
];
