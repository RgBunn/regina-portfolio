const { default: merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[fullhash].bundle.js",
    publicPath: "/regina-portfolio/tetris/",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[fullhash]-[name].css",
    }),
  ],
});
