import Vue from 'vue'
import Layout from '@/layout/index'
import Router from 'vue-router'
import {routeData} from './routeData'

import {getToken} from "@/util/auth";
Vue.use(Router)
export default function createRouter (context) {
  var routeArr = [
    {
      path: '/login',
      name: '登录页',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/pages/login/index'),
      meta: {
        keepAlive: false,
        isTab: false,
        isAuth: false
      }
    },
    {
      path: '/lock',
      name: '锁屏页',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/pages/lock/index'),
      meta: {
        keepAlive: false,
        isTab: false,
        isAuth: true
      }
    },
    {
      path: '/404',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/components/error-page/404'),
      name: '404',
      meta: {
        keepAlive: false,
        isTab: false,
        isAuth: false
      }

    },
    {
      path: '/403',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/components/error-page/403'),
      name: '403',
      meta: {
        keepAlive: false,
        isTab: false,
        isAuth: false
      }
    },
    {
      path: '/500',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/components/error-page/500'),
      name: '500',
      meta: {
        keepAlive: false,
        isTab: false,
        isAuth: false
      }
    },
    {
      path: '/',
      name: '主页',
      redirect: () => {
        let auth = process.env.VUE_APP_TARGET === 'web' ? getToken() : context.hasCookie;
        return auth ? '/home' : '/login'
      }
    },
    {
      path: '/home',
      component: Layout,
      redirect: '/home/index',
      children: [{
        path: 'index',
        name: '首页',
        meta: {
          i18n: 'dashboard'
        },
        component: () =>
          import( /* webpackChunkName: "views" */ '@/pages/home/index')
      }]
    }
  ]
  return new Router({
    mode: 'history',
    routes: routeArr.concat(routeData)
  })
}
