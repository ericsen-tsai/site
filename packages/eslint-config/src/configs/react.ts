import type { ESLint, Linter } from "eslint";

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from "../globs";
import type { Options } from "../index";
import { jsxA11yPlugin, reactHooksPlugin, reactPlugin, typescriptParser } from "../plugins";

export const react = (options?: Options): Linter.Config[] => {
  const reactPluginAll = reactPlugin.configs.all;

  return [
    {
      name: "erichandsen:react",
      plugins: {
        ...(reactPluginAll.plugins as unknown as Record<string, ESLint.Plugin>),
        "react-hooks": reactHooksPlugin,
        "jsx-a11y": jsxA11yPlugin
      },
      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          project: options?.project,
          sourceType: "module"
        }
      },
      rules: {
        ...reactPluginAll.rules,
        ...reactHooksPlugin.configs.recommended.rules,
        ...jsxA11yPlugin.configs.strict.rules,

        // @eslint-react
        "@eslint-react/no-complicated-conditional-rendering": "error",
        "@eslint-react/no-leaked-conditional-rendering": "error",
        "@eslint-react/avoid-shorthand-boolean": "off",
        "@eslint-react/avoid-shorthand-fragment": "off",

        // @eslint-react/dom
        "@eslint-react/dom/no-dangerously-set-innerhtml": "off",

        // @eslint-react/naming-convention
        "@eslint-react/naming-convention/filename": [
          "error",
          {
            rule: "kebab-case"
          }
        ],

        // jsx-a11y
        "jsx-a11y/alt-text": [
          "error",
          {
            elements: ["img"],
            img: ["Image"]
          }
        ],
        "jsx-a11y/lang": "error",
        "jsx-a11y/no-aria-hidden-on-focusable": "error",
        "jsx-a11y/prefer-tag-over-role": "error"
      },
      settings: {
        "jsx-a11y": {
          components: {
            Button: "button",
            Image: "img",
            Input: "input",
            Textarea: "textarea",
            Link: "a"
          }
        },
        ...reactPluginAll.settings
      }
    }
  ];
};
