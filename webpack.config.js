const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");
const FileIncludeWebpackPlugin = require("file-include-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  mode: "development",

  module: {
    rules: [
      {
        test: [/\.tsx?$/],

        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: ["ts-loader"],
      },
      {
        test: [/\.css$/i],
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], //, "development" ? "style-loader" : MiniCssExtractPlugin.loader
      },
      {
        test: /\.(sass|less|css)$/,
        use: [
          { loader: "style-loader" },
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: {} },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")({})],
            },
          },
        ],
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"],
  },
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      // port: 3000,
      // open: true,
      // hot: true,
      // compress: true,
      // historyApiFallback: true,
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
      template: path.resolve(__dirname, "src", "templates", "index.html"),
    }),
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: "./src/application.tailwind.css",
    }),
  ],
};
