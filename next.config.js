const path = require('path');
const { parsed: localEnv} = require('dotenv').config({
  path: path.join(__dirname, '.env.' + process.env.NODE_ENV)
});
const webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript({
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    config.node = {fs: 'empty'};
    return config;
  }
});
