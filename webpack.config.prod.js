module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/letterpad-editor.tsx",
  target: "web",
  output: {
    path: __dirname + "/dist",
    filename: "letterpad-editor.js",
    libraryTarget: "commonjs",
    globalObject: "this",
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
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
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
