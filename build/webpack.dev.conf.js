const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(
    baseWebpackConfig.entry[name]
  );
});

module.exports = merge.smart(baseWebpackConfig, {
  entry:{
    marvel: './src/marvel.js',
    demo: './src/demo.js',
    main: './src/main.js',
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'card/index.html',
        template: 'index.html',
        inject: true,
        hash: true,
        chunks:["manifest","main"],
        chunksSortMode: 'dependency'
      }),
    new HtmlWebpackPlugin({
      filename: 'card/marvel.html',
      template: 'index.html',
      inject: true,
      hash: true,
      chunks:["manifest","marvel"],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'card/demo.html',
      template: 'index.html',
      inject: true,
      hash: true,
      chunks:["manifest","demo"],
      chunksSortMode: 'dependency'
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new BundleAnalyzerPlugin(),
    new FriendlyErrorsPlugin()
  ]
});
