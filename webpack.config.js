const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist/bundles",
    publicPath: "/dist/bundles/",
    filename: "editor.react.js"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
  devServer: {
    contentBase: "./",
    hot: true
  }
};
