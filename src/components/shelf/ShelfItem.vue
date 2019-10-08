<template>
  <div class="shelf-item "
       :class="{'shelf-item-shadow': data.type === 1 || data.type === 2}"
       @click="onItemClick">
    <!--动态组件有三种状态--><!--2透明度设置 is-edit 选中颜色加深 selected-->
    <component class="shelf-item-comp"
               :class="{'is-edit': isEditMode && data.type === 2}"
               :is="item"
               :data="data"></component>
    <div class="icon-selected"n
         v-show="isEditMode && data.type === 1"
         :class="{'is-selected': data.selected}"></div>

  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin' // 数据共享的用处?
  import Shelfbook from './ShelfItemBook'
  import ShelfCategory from './ShelfItemCategory'
  import ShelfAdd from './ShelfItemAdd'
  import { gotoStoreHome } from '../../utils/store'


  export default {
    mixins: [storeShelfMixin],
    props: {
      data: Object, //一本书或者一组书或者加号
    },
    computed: {
      item () {
        return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
      }
    },
    data () {
      return {
        book: Shelfbook,
        category: ShelfCategory,
        add: ShelfAdd,
      }
    },
    methods: {

      onItemClick() {
        if (this.isEditMode) {
          this.data.selected = ! this.data.selected
          if (this.data.selected) {
            this.shelfSelected.pushWidthoutDuplicate(this.data)
          } else {
            this.setShelfSelected(this.shelfSelected.filter(item =>
              item.id !==this.data.id))
          }
        } else {
          if (this.data.type === 1) {
            this.showBookDetail(this.data)
          } else if (this.data.type === 2) {

          } else {
            gotoStoreHome(this)
          }
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/global';
  .shelf-item {
    position: relative;
    width: 100%;
    height: 100%;
    &.shelf-item-shadow {
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .3)
    }
    .shelf-item-comp {
      opacity: 1;
      &.is-edit {
      opacity: .5;
    }
    }
    .icon-selected {
      position: absolute;
      bottom: px2rem(2);
      right: px2rem(2);
      font-size: px2rem(18);
      color: rgba(0, 0, 0, .4);
      &.is-selected {
        color: $color-blue;
      }
    }
  }
</style>

