import erichandsen from "./dist/index.js";

export default erichandsen({
  project: "./tsconfig.json",
  tsconfigRootDir: import.meta.dirname,
  react: true,
  next: true,
  turbo: true,
  typescript: true
});
