// webpack config

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { VueLoaderPlugin } = require('vue-loader/dist/index')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const webpack = require('webpack')

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {VueLoaderPlugin} from 'vue-loader/dist/index.js'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpack from 'webpack'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export default {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      title: '给老师的数独' 
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 7000,
    publicPath: '/'
  }
}


