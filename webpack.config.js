const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./index.js",
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
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
    }
};
