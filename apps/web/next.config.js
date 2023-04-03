const packageJson = require("./package.json");
const modulesToTranspile = [
  ...Object.keys(packageJson.dependencies).filter((dep) =>
    dep.startsWith("react-native")
  ),
];

// @ts-expect-error "TODO: fix this"
const withTM = require("next-transpile-modules")(modulesToTranspile);

/** @type {import('next').NextConfig} */
const config = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
};

module.exports = withTM(config);
