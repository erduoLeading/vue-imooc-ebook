import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'// 返回一个book对象(state,mounted,actions)
import getters from './getters'// 返回一个book对象(test)
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 此处有坑使用modules导入后，state的值是在book对象下
    // 需要用this.$store.state.book.属性才能渠道对应的值
    // 至于modules会被当成透明，直接讲内层的book暴露在state中
    book
  },
  getters
})
