import {setToken} from "@/util/auth";
import {setStore} from "@/util/store";
// import {deepClone} from '@/util/util'
// import routeJson from './routeData'

// const map = {
//   layout: () => import('@/layout/index'),
//   constructionInfo: () => import('@/views/systemManagement/constructionInfo'),
//   GBCascade: () => import('@/views/systemManagement/GBCascade'),
//   networkConfig: () => import('@/views/systemManagement/networkConfig'),
//   userManagement: () => import('@/views/userManagement/index'),
//   videoConfig: () => import('@/views/videoConfig/index')
// }

// function initRouter(arr) {
//   arr.forEach(item => {
//   // item.component = require[arr.path]
//     item.component = item.isLayout ? map.layout : map[item.meta.name]
//     if (item.children) {
//       initRouter(item.children)
//     }
//   })
//   return arr
// }

export default {
  namespaced: true,
  state: {
    menu: [],
    userInfo: {}
  },
  actions: {
    LoginByUsername({commit}) {
      return new Promise((resolve) => {
        const data = {
          access_token: "IjoiYWRtaW4iLCJuaW",
          account: "admin",
          avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          dept_id: "1123598813738675201",
          detail: {
            type: "web"
          },
          expires_in: 3600,
          license: "powered by bladex",
          nick_name: "管理员",
          oauth_id: "",
          post_id: "1123598817738675201",
          refresh_token: "eyJ0eXAiOiJKV1QiLCJhb",
          role_id: "1123598816738675201",
          role_name: "administrator",
          tenant_id: "000000",
          token_type: "bearer",
          user_id: "1123598821738675201",
          user_name: "admin"
        };
        commit('SET_TOKEN', data.access_token);
        commit('SET_USER_INFO', data);
        // commit('tags/DEL_ALL_TAG');
        // commit('common/CLEAR_LOCK');
        resolve()
      })
    },
    // GetMenu({commit}, userId) {
    //   console.log('userId', userId)
    //   return new Promise(resolve => {
    //     let data = deepClone(routeJson.route);
    //     let menu = initRouter(data)
    //     commit('SET_MENU', menu)
    //     resolve(menu)
    //   })
    // },
    LogOut({commit}) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        commit('REMOVE_TOKEN')

        commit('SET_MENU', [])
        resolve()
      })
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      setToken(token)
      state.token = token
      setStore({name: 'token', content: state.token})
    },
    REMOVE_TOKEN(state) {
      state.token = ''
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      setStore({name: 'userInfo', content: userInfo})
    },
    SET_MENU(state, menu) {
      state.menu = menu
    }
  }
}
