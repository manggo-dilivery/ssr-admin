import {
  setStore,
  removeStore
} from '@/util/store'
export default {
  namespaced: true,
  state: {
    isCollapse: false,
    menu: [],
    showTag: true,
    isLock: false,
    lockPasswd: ''
  },
  actions: {

  },
  mutations: {
    SET_COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    SET_LOCK: (state) => {
      state.isLock = true;
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd;
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    CLEAR_LOCK: (state) => {
      state.isLock = false;
      state.lockPasswd = '';
      removeStore({
        name: 'lockPasswd',
        type: 'session'
      });
      removeStore({
        name: 'isLock',
        type: 'session'
      });
    },
  }
}
