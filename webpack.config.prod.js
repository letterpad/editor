const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/editor.tsx",
  target: "web",
  output: {
    path: __dirname + "/umd",
    filename: "letterpad-editor.js",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(css|pcss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1, sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: "inline"
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true,
            collapseWhitespace: true
          }
        }
      }
    ]
  },
  externals: {
    "react-dom": "react-dom",
    react: "react"
  }
};
