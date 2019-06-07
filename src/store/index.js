import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'// 返回一个book对象(state,mounted,actions)
import getters from './getters'// 返回一个getters选项(fileName,menuVisible)
import actions from './actions' //返回actions选项(setFileName,setMenuVisible)
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 此处有坑使用modules导入后，state的值是在book对象下
    // 需要用this.$store.state.book.属性才能取到对应的值
    // 至于modules会被当成透明，直接讲内层的book暴露在state中
    book
  },
  getters,
  actions
})
