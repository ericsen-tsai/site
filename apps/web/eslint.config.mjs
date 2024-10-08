import erichandsen from "@erichandsen/eslint-config";

export default erichandsen({
  project: "./tsconfig.json",
  tsconfigRootDir: import.meta.dirname,
  react: true,
  next: true
});
