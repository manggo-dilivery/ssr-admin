import Vue from 'vue'
import App from './App'
import createRouter from './router'
import {createStore} from "./store/store";
import {sync} from 'vuex-router-sync';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SvgIcon from '@/components/SvgIcon'
import basicBlock from './components/basic-block/main'
import basicContainer from './components/basic-container/main'
import './styles/common.scss'
import website from './config/website'
import '@/icon/index'
// import {getToken} from "./util/auth";

Vue.use(Element);
export default function createApp (context) {
  const router = createRouter(context)
  const store = createStore()
// 同步路由状态(route state)到 store
  sync(store, router)
  // Vue.mixin({
  //   mounted() {
  //     const {asyncData} = this.$options
  //     // console.log('asyncData', this.$options)
  //     if (asyncData) {
  //       // 将获取数据操作分配给 promise
  //       // 以便在组件中，我们可以在数据准备就绪后
  //       // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
  //       this.dataPromise = asyncData({
  //         store: this.$store,
  //         route: this.$route
  //       })
  //     }
  //   }
  // })
  Vue.component('svg-icon', SvgIcon);
  Vue.component('basicBlock', basicBlock);
  Vue.component('basicContainer', basicContainer);
  Vue.prototype.website = website
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {app, router, store}
}
