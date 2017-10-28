const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./base')

module.exports = merge(baseConfig, {

  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },

  devtool: 'inline-source-map'

})
