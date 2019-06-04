const prodWebpackConfig = require("./webpack.config.prod");
const { externals, ...withReact } = prodWebpackConfig;

module.exports = {
  ...withReact,

  entry: "./index.tsx",
  output: {
    ...withReact.output,
    path: __dirname + "/dist/bundles",
    filename: "editor.demo.js"
  }
};
