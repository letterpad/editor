module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/letterpad-editor.tsx",
  target: "web",
  optimization: {
    minimize: false
  },
  output: {
    path: __dirname + "/dist",
    filename: "letterpad-editor.js",
    libraryTarget: "commonjs2",
    globalObject: 'this'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|pcss)$/,
        use: [
          {
            loader: "css-loader",
            options: { importLoaders: 1, sourceMap: true },
          },
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     sourceMap: "inline"
          //   }
          // }
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true,
            collapseWhitespace: true,
          },
        },
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "raw-loader",
            options: {
              /* your options here */
            },
          },
        ],
      },
    ],
  },
  externals: {
    "react-dom": "react-dom",
     react: "react",
  },
};
