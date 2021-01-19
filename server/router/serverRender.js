const ejs = require('ejs')
module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  const context = {url: ctx.path, title: 'ssr test'}
  // try {
    const appString = await renderer.renderToString(context)
    // console.log('context', context)
    if (context.state.route.fullPath !== ctx.path) {
      return ctx.redirect(context.state.route.fullPath)
    }
    let title;
    if (context.state.route.meta.showTitle) {
       title = context.state.route.name
    }
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles,
      scripts: context.renderScripts,
      title: title,
      initalState: context.renderState
    })
    ctx.body = html
  // } catch {
  //
  // }
}
