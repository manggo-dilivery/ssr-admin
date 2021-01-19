const fs = require('fs')
const path = require('path')
const koaRouter = require('koa-router')
const LRU = require('lru-cache')
const filterCookie = require('../utils/auth')

const {createBundleRenderer} = require('vue-server-renderer')
const serverBundle = require('../../dist/server/vue-ssr-server-bundle')
const clientManifest = require('../../dist/client/vue-ssr-client-manifest')

const renderer = createBundleRenderer(serverBundle, {
  cache: new LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15
  }),
  runInNewContext: false,
  template: fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8'),
  clientManifest
})
// app.use(express.static('../dist/client', {index: false}))

// app.get('*', async (req, res) => {
//   res.status(200)
//   res.setHeader("Content-type", "text/html")
//   const context = {
//     url: req.url,
//     title: 'ssr test'
//   }
//   const html = await renderer.renderToString(context)
//   // console.log(html)
//   res.send(html)
// })
// const microCache = LRU({
//   max: 100,
//   maxAge: 1000
// })
// const isCacheable = ctx => {
//
// }
const router = new koaRouter()
router.get('/(.*)', async (ctx) => {
  if (!filterCookie.filterCookie(ctx.request)) {
    ctx.request.url = '/login'
  }
  const context = {
    url: ctx.request.url,
    title: 'ssr test'
  }
  // const cacheable = microCache.get(ctx.path)
  // if (cacheable) {
  //   const hit = microCache.get(ctx.path)
  //   if (hit) {
  //     return res.end(hit)
  //   }
  // }
  ctx.body = await renderer.renderToString(context)
})

module.exports = router

// app.listen(3001, () => {
//   console.log('渲染服务启动成功')
// })
