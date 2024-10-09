import erichandsen from "@erichandsen/eslint-config";

export default erichandsen(
  {
    project: "./tsconfig.json",
    tsconfigRootDir: import.meta.dirname,
    react: true
  },
  {
    rules: {
      "jsx-a11y/heading-has-content": "off"
    }
  }
);
