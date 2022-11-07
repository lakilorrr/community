const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'chunk/[id].[contenthash:8].css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
          }
        }
      })
    ],
  }
})