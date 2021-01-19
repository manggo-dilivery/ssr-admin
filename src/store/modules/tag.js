import {getStore, setStore} from "@/util/store";
import {setCookie} from "@/util/auth";
import {diff} from '@/util/util'

const tagObj = {
  label: '', //标题名称
  value: '', //标题的路径
  params: '', //标题的路径参数
  query: '', //标题的参数
  meta: {} //额外参数
}
var tagList, currTag
if (process.env.VUE_APP_TARGET === 'web') {
  tagList = getStore({name: 'tagList'}) || [{
    label: '首页',
    value: '/home',
    params: '',
    query: '',
    meta: {}
  }]
  currTag = getStore({name: 'currTag'}) || tagObj
} else {
  tagList = [{
    label: '首页',
    value: '/home',
    params: '',
    query: '',
    meta: {},
    close: false
  }]
  currTag = tagObj
}
function setFirstTag(list) {
  if (list.length === 1) {
    list[0].close = false
  } else {
    list.forEach(ele => {
      ele.close = ele.value !== '/home'
    })
  }
}
export default {
  namespaced: true,
  state: {
    isCollapse: false,
    tagList: tagList,
    currTag: currTag
  },
  actions: {},
  mutations: {
    ADD_TAG: (state, action) => {
      state.currTag = action;
      setStore({name: 'currTag', content: action})
      if (state.tagList.some(ele => diff(ele, action))) return
      state.tagList.push(action)
      setFirstTag(state.tagList)
      setStore({name: 'tagList', content: state.tagList})
      setCookie('tagList', state.tagList)
    },
    DEL_TAG: (state, action) => {
      state.tagList = state.tagList.filter(item => {
        return !diff(item, action)
      })
      setFirstTag(state.tagList)
      setStore({name: 'tagList', content: state.tagList})
    },
    DEL_ALL_TAG: (state) => {
      state.tagList = state.tagList.filter(item => {
        return item.value === '/home'
      })
      // console.log('state.tagList', state.tagList)
      state.currTag = state.tagList[0]
      setFirstTag(state.tagList)
      setStore({name: 'tagList', content: state.tagList})
    },
    DEL_TAG_OTHER: (state) => {
      state.tagList = state.tagList.filter(item => {
        return item.value === '/home' || item.value === state.currTag.value
      })
      setFirstTag(state.tagList)
      setStore({name: 'tagList', content: state.tagList})
    },
    SET_CURR_TAG: (state, currTag) => {
      state.currTag = currTag
    },
    SET_TAG_LIST: (state) => {
      state.tagList = getStore({name: 'tagList'})
      state.currTag = getStore({name: 'currTag'})
    }
  }
}
