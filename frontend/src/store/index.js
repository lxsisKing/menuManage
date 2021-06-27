import Vue from 'vue'
import Vuex from 'vuex'
import foods from './modules/foods'
import authorization from './modules/authorization.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    foods,
    authorization,
  }
})
