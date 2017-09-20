import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    articleSave: false,
  	aa: 'aa'
  },//this.$emit(articleSave)
  getters: {
    toUp (state) {
      return state.aa.toUpperCase()
    }
  },
  mutations: { 
  	changeSave (state) {
  	  // state.articleSave += xx//+=改变自身  commit、mutations实例
  	  state.articleSave = !state.articleSave
  	}
  },
  actions: {
  	changeSave ({commit}) {
  	  commit('changeSave')
  	  console.log(11)
    }
  }
}) 