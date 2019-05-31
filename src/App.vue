<template>
  <div id="app">
    <span class="text">ABCDEFG</span>
    <router-view/>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  /*
    mapgetters的实现原理：
    1.创建一个对象
    2.将对象的值通过方法导入一个新对象
    3.将新对象的值返回
    4.调用这个方法
   */
  export default {
    mounted () {
      /*
      /1.dispatch函数两个参数:
            参数1：要触发的handler函数
            参数2：提交的值
       2.支持链式异步then
            接收 action中return的promise对象
       */
      this.$store.dispatch('setTest', 10).then((res) => {
        console.log(this.test)
      })
      console.log(this.a, this.b, this.c)
    },
    computed: {
      // 将test对象混入computed对象中
      ...mapGetters(['test']),
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
    console.log(html)
    let fontSize = innerWidth / 10 > 50 ? 50 : innerWidth / 10;
    html.style.fontSize = fontSize + 'px'
  })
</script>
<style lang="scss" scoped>
  @import "./assets/styles/global.scss";
  .text{
    font-family: 'Days One';
    font-size: px2rem(20);
    color: orange;
  }
</style>
