const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./base')

module.exports = merge(baseConfig, {

  output: {
    filename: '[name].min.js',
    path: path.resolve('./dist')
  },

  plugins: [
    new UglifyJSPlugin()
  ]

})
