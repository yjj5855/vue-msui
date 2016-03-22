var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  devtool: 'source-map',

  entry: {
    web_app:"./client/com.chezhil.webapp/main",
    //公共库
    vendor : [
      'q',
      './env',
      'vue',
      'vue-router',
      './client/service/api.service',
      './client/service/weixin.service'
    ]
  },

  output: {
    path: __dirname + '/public/webapp',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].js',
    publicPath: '/webapp/'
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel' ,
        query: {
          cacheDirectory: true,
          presets: ['es2015','stage-3']
        }
      },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") }
    ]
  }
}
