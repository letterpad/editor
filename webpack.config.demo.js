const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: ["./demo/index.tsx"],
  target: "web",
  output: { path: path.join(__dirname, "build"), filename: "editor.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ extensions: [".ts", ".tsx"] })],
  },
  devtool: "source-map",
  devServer: { contentBase: path.join(__dirname, "src"), hot: true },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: ["babel-loader"],
      // },
      // {
      //   test: /\.(ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: ["ts-loader"],
      // },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            sync: true,
            jsc: {
              paths: {
                "@editor/*": ["src/editor/*"],
                "@hooks/*": ["src/hooks/*"],
                "@plugins/*": ["src/plugins/*"],
                "@store": ["src/store"],
                "@store/*": ["src/store/*"],
                "@utils/*": ["src/utils/*"],
                "@src": ["src"],
                "@src/*": ["src/*"],
                "@demo/*": ["demo/*"],
              },
            },
          },
        },
      },
      {
        test: /\.(css|pcss)$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "demo", "index.html"),
    }),
  ],
};
