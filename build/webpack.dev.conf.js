const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const vuxLoader = require('vux-loader')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(
    baseWebpackConfig.entry[name]
  );
});

const webpackConfig = merge.smart(baseWebpackConfig, {
  entry:{
    demo: './src/demo.js',
    main: './src/main.js',
    all: './src/all.js',
    alldemo: './src/alldemo.js',
    pcadmin: './src/pcadmin.js',
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
        filename: 'cardVue/index.html',
        template: 'index.html',
        inject: true,
        hash: true,
        chunks:["main"],
        chunksSortMode: 'dependency'
      }),

    new HtmlWebpackPlugin({
      filename: 'cardVue/demo.html',
      template: 'index.html',
      inject: true,
      hash: true,
      chunks:["demo"],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'cardVue/alldemo.html',
      template: 'index.html',
      inject: true,
      hash: true,
      chunks:["alldemo"],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'cardVue/all.html',
      template: 'index.html',
      inject: true,
      hash: true,
      chunks:["all"],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'cardVue/pcadmin.html',
      template: 'index.html',
      inject: true,
      hash: true,
      chunks:["pcadmin"],
      chunksSortMode: 'dependency'
    }),

    // https://github.com/ampedandwired/html-webpack-plugin
    new BundleAnalyzerPlugin(),
    new FriendlyErrorsPlugin()
  ]
});

module.exports = vuxLoader.merge(webpackConfig,{
  plugins: ['vux-ui']
});
