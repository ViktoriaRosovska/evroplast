const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");
const FileIncludeWebpackPlugin = require("file-include-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  mode: "development",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  plugins: [
    new FileIncludeWebpackPlugin({
      source: "./src/templates", // relative path to your templates
      filename: "index.html",
      inject: true,
      replace: [
        {
          regex: /\[\[FILE_VERSION]]/, // additional things to replace
          to: "v=1.0.0",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "dist", "index.html"),
      inject: false,
    }),
  ],
};
