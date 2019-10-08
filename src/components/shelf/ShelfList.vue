<template>
  <div class="shelf-list">
    <!--父组件List获取图书数据.传值给子组件item-->
    <div class="shelf-list-item-wrapper" v-for="(item,index) in shelfList" :key="index">
      <shelf-item :data="item" :style="{height: itemHeight}"></shelf-item>
      <div class="shelf-list-title-wrapper">
        <span class="shelf-list-title title-small">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import  ShelfItem from  './ShelfItem'
  import  { realPx } from '../../utils/utils'

  export default {
    mixins: [storeShelfMixin],
    methods: {
      onscroll(offsetY) {
        this.setOffsetY(offsetY)
      }
    },
    components: {
      ShelfItem
    },
    computed: {
      // 自适应高度计算
      itemHeight() {
        // w/ 250 = h / 350
        // h = w*350/250
        return ((window.innerWidth - realPx(120)) / 3 )/250 * 350 + 'px'
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/global';
  .shelf-list {
    position: absolute;
    left: 0;
    top: px2rem(94);
    z-index: 100;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .shelf-list-item-wrapper {
      flex: 0 0  33.33%;
      width: 33.33%;
      padding: px2rem(15);
      box-sizing: border-box;
      .shelf-list-title-wrapper {
        margin-top: px2rem(10) ;
      }
    }
  }
</style>
