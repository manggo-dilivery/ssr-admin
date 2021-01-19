import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// import foo from './modules/foo'
import common from './modules/common'
import user from './modules/user'
import tag from './modules/tag'
export function createStore() {
  return new Vuex.Store({
    modules: {
      common,
      user,
      tag
    }
  })
}
