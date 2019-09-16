<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

  export default {
    mounted () {

    },
    computed: {

    }
  }
  /*
   1. 监听DOMContentLoaded加载完毕事件
   2. 获取对应的根元素html
   3. 创建字体大小为可视区/10
   4. 限制最大值
   5. 限制最小值
   4. 设置html的字体大小为 新字体大小
   * */
  document.addEventListener('DOMContentLoaded', () => {
    let html = document.querySelector('html')
    // console.log(html)
    let fontSize = innerWidth / 10 > 50 ? 50 : innerWidth / 10
    html.style.fontSize = fontSize + 'px'
  })
</script>
<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #ddd;
  }
</style>
