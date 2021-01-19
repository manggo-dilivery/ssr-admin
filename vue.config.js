const vueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const vueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const path = require('path')
const conf = require('./src/config/conf')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'
const isPro = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    extract: isPro
  },
  devServer: {
    port: 9527,
    headers: {'Access-Control-Allow-Origin': '*'}
  },
  publicPath: isPro ? conf.proPath : `${conf.devPath}`,
  outputDir: './dist/' + target,
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    devtool: 'source-map',
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,
      // path: target === 'server' ? path.join(__dirname, '../server-build') : path.join(__dirname, '../client-build')
    },
    externals: TARGET_NODE
      ? nodeExternals({
        allowlist: [/\.css$/, /\.scss$/]
      })
      : undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    },
    plugins: [TARGET_NODE ? new vueSSRServerPlugin() : new vueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        })
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icon'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
