const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/index.tsx",
  target: "web",
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
    libraryTarget: "commonjs",
    globalObject: "this",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ extensions: [".ts", ".tsx"] })],
  },
  module: {
    rules: [
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
