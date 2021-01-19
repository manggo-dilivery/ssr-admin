const Router = require('koa-router')
const apiRouter = new Router({prefix: '/'})

const successRes = data => {
  return {
    success: true,
    data
  }
}

apiRouter.get('/', async ctx => {
  // const todo = await ctx.db.getA
})
