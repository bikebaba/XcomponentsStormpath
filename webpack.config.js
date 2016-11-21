/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/app'
  ],
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src/js')
    },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader?insertAt=top',
          'css-loader?modules&-autoprefixer&importLoaders=1&localIdentName=rst__[local]',
          'postcss-loader',
          'sass-loader',
        ],
        include: [path.join(__dirname, 'src/js'), path.join(__dirname, 'src/js/pages')]
      }],
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        'node_modules'
      ]
    }
  }
};