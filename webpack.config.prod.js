const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/editor.tsx",
  target: "web",
  output: {
    path: __dirname + "/dist/bundles",
    publicPath: "/dist/bundles/",
    filename: "editor.js",
    libraryTarget: "umd"
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
      }
    ]
  },
  devServer: {
    contentBase: "./",
    hot: true
  },
  externals: {
    "react-dom": "react-dom",
    react: "react"
  }
};
