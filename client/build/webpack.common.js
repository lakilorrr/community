const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.join(__dirname, '../src')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDev ? true : false,
        }
      },
      {
        test: /\.css$/,
        include: [path.join(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        include: [path.join(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              },
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                modules: true,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: 1,
          name: 'vendors'
        },
        common: {
          minChunks: 1,
          priority: 0,
          name: 'common'
        },
      },
    },
  }
}