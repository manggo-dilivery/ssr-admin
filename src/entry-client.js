import createApp from './createApp';
import {getToken} from "./util/auth";
import {getStore} from "./util/store";
// import {validatenull} from "./util/validate";
const context = {
  url: '',
  title: 'ssr test',
  hasCookie: getToken(),
  route: []
}
const {app, router, store} = createApp(context)
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
// 第一种客户端数据预取的方法 -- 在路由导航之前解析数据
// 优点：可以直接在数据准备就绪时，传入视图渲染完整内容
// 缺点：如果数据预取需要很长时间，用户在当前视图会感受到"明显卡顿"
// 因此，如果使用此策略，建议提供一个数据加载指示器 (data loading indicator)。
router.onReady(() => {
  if (process.env.VUE_APP_TARGET === 'web') {
    router.beforeEach((to, from, next) => {
      if (getToken()) {
        if (to.path === '/login') {
          next('/')
        } else {
          if (from.path === '/lock') {
            console.log('lockPasswd', getStore({name: 'isLock'}))
            if (getStore({name: 'isLock'})) {
              next('/lock')
            } else {
              next()
            }
            // store.state.common.lockPasswd
          }
          // const value =
          const label = to.name
          const meta = to.meta || {}
          if (meta.isTag) {
            store.commit('tag/ADD_TAG', {
              label,
              params: to.params,
              query: to.query,
              value: to.fullPath
            })
          }
          next()
        }
      } else {
        next()
      }
    })
  }
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const actived = matched.filter((item, index) => {
      return diffed || (diffed = (prevMatched[index] !== item))
    })
    if (!actived.length) {
      return next()
    }
    // 这里如果有加载指示器 (loading indicator)，就触发
    Promise.all(actived.map(c => {
      if (c.asyncData) {
        // console.log('asyncData', c.asyncData({store, route: to}))
        return c.asyncData({store, route: to})
      }
    })).then(() => {
      next()
    }).catch(next)
  })
  app.$mount('#app')
})
