const { merge } = require("webpack-merge");
const path = require('path');
const commonConfig = require("./webpack.common");
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3005,
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "../public"),
    },
    compress: true,
  },
  plugins: [
    new ReactRefreshPlugin(),
  ],
  cache: {
    type: 'filesystem'
  }
})