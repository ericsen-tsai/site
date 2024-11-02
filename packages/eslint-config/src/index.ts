import type { Linter } from "eslint";

import { comments } from "./configs/comments";
import { ignores } from "./configs/ignores";
import { importSort } from "./configs/import-sort";
import { imports } from "./configs/imports";
import { javascript } from "./configs/javascript";
import { next } from "./configs/next";
import { prettier } from "./configs/prettier";
import { react } from "./configs/react";
import { reactCompiler } from "./configs/react-compiler";
import { sonarjs } from "./configs/sonarjs";
import { tailwindcss } from "./configs/tailwindcss";
import { turbo } from "./configs/turbo";
import { typescript } from "./configs/typescript";
import { unicorn } from "./configs/unicorn";
import { hasTurbo, hasTypeScript } from "./env";

export type Options = {
  typescript?: boolean;
  react?: boolean;
  turbo?: boolean;
  next?: boolean;
  gitignore?: boolean;

  // TypeScript options
  project?: string;
  tsconfigRootDir?: string;
};

type UserConfigs = Linter.Config[];

const erichandsen = async (
  options: Options = {},
  ...userConfigs: UserConfigs
): Promise<Linter.Config[]> => {
  const {
    typescript: enableTypeScript = hasTypeScript,
    react: enableReact = false,
    turbo: enableTurbo = hasTurbo,
    next: enableNext = false,
    gitignore: enableGitignore = true
  } = options;

  const configs: Linter.Config[] = [];

  if (enableGitignore) {
    configs.push((await import("eslint-config-flat-gitignore")).default());
  }

  configs.push(
    ...ignores,
    ...javascript,
    ...unicorn,
    ...comments,
    ...importSort,
    ...sonarjs,
    ...tailwindcss,
    ...imports,
    ...prettier
  );

  if (enableTypeScript) {
    configs.push(...typescript(options));
  }

  if (enableReact) {
    configs.push(...react(options), ...reactCompiler);
  }

  if (enableTurbo) {
    configs.push(...turbo);
  }

  if (enableNext) {
    configs.push(...next);
  }

  configs.push(...userConfigs);

  return configs;
};

export * from "./globs";

export default erichandsen;
