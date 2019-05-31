const book = {
  state: {
    test: 1
  },
  mutations: {// 设置值
    'SET_TEST': (state, newTest) => {
      state.test = newTest
    }
  },
  actions: {
    /*
      1，参数1：是一个context对象：作用于store类似,但不是同一个东西
               如果重复使用某个属性用解构{commit,state}
      2.参数2: 提交的值
      3.return： 会返回一个promise对象，适合链式编程
    * */
    setTest: ({ commit, state }, newTest) => {
      // 打印旧值和新值
      // console.log(commit, state)
      // console.log(state.test, newTest)
      // 提交
      // commit('SET_TEST',newTest)//与return作用相同
      return commit('SET_TEST', newTest)
    }
  }
}

export default book
