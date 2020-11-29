'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTPBASEURL: '"https://localhost:44304"',
  HTTPOPENAPIURL: '"http://192.168.31.247:10001"',
  PAGE_SIZE: 1
});
