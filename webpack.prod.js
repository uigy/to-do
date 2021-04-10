const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[contenthash].bundle.js",
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "./img",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: [
                "./src/assets/scss/variables.scss",
                "./src/assets/scss/mixins.scss",
              ],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-transform-runtime",
            "@babel/plugin-proposal-class-properties",
          ],
        },
      },
    ],
  },
});
