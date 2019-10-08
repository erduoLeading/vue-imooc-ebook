<!-- 书架组件 -->
<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <!--滚动条组件-->
    <scroll class="store-shelf-scroll-wrapper"
            :top="0"
            :bottom = scrollBottom
            ref="scroll"
            @onScroll="onScroll">
      <shelf-search></shelf-search>
      <shelf-list></shelf-list>
      <ShelfFooter></ShelfFooter>
    </scroll>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import { storeShelfMixin } from '../../utils/mixin'
  import Scroll from '../../components/common/Scroll'
  import ShelfSearch from '../../components/shelf/ShelfSearch'
  import ShelfList from '../../components/shelf/ShelfList'
  import ShelfFooter from '../../components/shelf/ShelfFooter'
  import { shelf } from '../../api/store'
  import { appendAddToShelf } from '../../utils/store'

  export default {
    mixins: [storeShelfMixin],
    data() {
      return {
        scrollBottom: 0
      }
    },
    components: {
      Scroll,
      ShelfTitle,
      ShelfSearch,
      ShelfList,
      ShelfFooter
    },
    watch: {
      isEditMode(isEditMode) {
        this.scrollBottom = isEditMode ? 48 : 0
        this.$nextTick(()=>{
          this.$refs.scroll.refresh()
        })
      }
    },
    methods: {
     onScroll(offsetY) {
       this.setOffsetY(offsetY)
     },
     getShelfList() {
       shelf().then(response => {
         if (response.status === 200 && response.data && response.data.bookList) {
           this.setShelfList(appendAddToShelf(response.data.bookList))
         }
         /*
         * 1.获取书籍状态，渲染书籍
         * */
       })
     }
    },
    mounted () {
      this.getShelfList()
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .store-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;
    .store-shelf-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
  }
</style>
