import Vue from 'vue'
import Vuex from 'vuex'
import eth from './modules/eth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    eth: eth
  },
  strict: debug
})
