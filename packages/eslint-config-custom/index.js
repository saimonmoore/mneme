module.exports = {
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
};
