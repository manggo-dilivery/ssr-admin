const fs = require('fs');
const axios = require('axios');
const path = require('path');
const MemoryFs = require('memory-fs');
const webpack = require('webpack');
const conf = require('../../src/config/conf')
const koaRouter = require('koa-router')

const serverConfig = require('@vue/cli-service/webpack.config')
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  );
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
});

const handleSSR = async (ctx) => {
  // try {
  if (!bundle) {
    console.log('bundle还未生成')
    return
  }
  if (ctx.request.url === '/favicon.ico') {
    const iconPath = path.join(__dirname, '../../public/favicon.ico')
    return fs.readFileSync(iconPath)
  }
  const hasCookie = ctx.cookies.get('access-token')
  let context = {
    url: hasCookie ? ctx.request.url : '/login',
    title: 'ssr test',
    hasCookie: hasCookie
  }
  const {createBundleRenderer} = require('vue-server-renderer')
  const clientManifestResp = await axios.get(`${conf.devPath}/vue-ssr-client-manifest.json`)
  const clientManifest = clientManifestResp.data
  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    inject: false,
    template: fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8'),
    clientManifest
  });
  const html = await renderer.renderToString(context)
  ctx.body = html
}

const router = new koaRouter()
router.get('/(.*)', handleSSR)

module.exports = router
