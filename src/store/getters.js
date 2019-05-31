// 方便书写
const book = {
  // 作用使book返回test,能被直接使用this.$state.store.test
  test: state => state.book.test// 使得Getters中的test指向state.book.test=>使得在mapGatters直接就是指向test
}

export default book
