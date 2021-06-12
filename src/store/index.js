import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import theme from './modules/theme'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    theme
  },
  getters
})

export default store
