const Koa = require('koa')
const app = new Koa()
const staticCache = require('koa-static-cache');
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

// app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
let pageRouter
if (isProd) {
  pageRouter = require('./router/prod-ssr')
  const staticPath = '../dist/client'
  app.use(staticCache(
    path.join(__dirname, staticPath),
    {maxAge: 24 * 60 * 60}
  ))
} else {
  pageRouter = require('./router/dev-ssr')
}
app.use(staticCache(
  path.join(__dirname, '../static'),
  {maxAge: 24 * 60 * 60}
))
// router.get('/(.*)', handleSSR)
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

app.listen(3001, '0.0.0.0', () => {
  console.log(`server is listening on http://localhost:3001`)
})
