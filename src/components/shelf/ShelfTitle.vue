<template>
  <transition name="fade">
    <!--书架标题-->
    <div class="shelf-title" :class="{'hide-shadow': ifHideShadow}" v-show="shelfTitleVisible">
      <!--标题文字-->
      <div class="shelf-title-text-wrapper">
        <!--上部文字-->
        <span class="shelf-title-text">
        {{$t('shelf.title')}}
      </span>
        <!--下部文字默认隐藏,点击编辑显示文字"选择书籍",根据选中数量显示数量-->
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <!--清除缓存按钮-->
      <div class="shelf-title-btn-wrapper shelf-title-left"
           @click="clearCache">
      <span class="shelf-title-btn-text">
        {{$t('shelf.clearCache')}}
      </span>
      </div>
      <!--编辑按钮-->
      <div class="shelf-title-btn-wrapper shelf-title-right">
      <span class="shelf-title-btn-text"  @click="onEditClick">
        <!--编辑模式显示取消，非编辑模式显示编辑-->
        {{isEditMode? $t('shelf.cancel') :  $t('shelf.edit')}}
      </span>
      </div>
    </div>
  </transition>

</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  export default {
    mixins: [storeShelfMixin],

    computed: {
      selectedText() {
        /*
        * 1.根据状态量判断是否显示
        *   2.显示的时候根据数量是否为空决定显示文字还是数组的长度
        *
        * */
        // if (this.shelfSelected) {
        //   return this.shelfSelected.length
        // } else {
        //   return this.$t('shelf.selectBook')
        // }
        // 三目
        const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
        return selectedNumber <= 0 ? this.$t('shelf.selectBook') : (selectedNumber ===1 ?
               this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber) : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber))
      }
    },
    methods: {
      onEditClick() {
        if (!this.isEditMode) {
          this.setShelfSelected([])
          this.shelfList.forEach(item => {
            item.selected = false
          })
        }
        this.setIsEditMode (!this.isEditMode)
      },
      clearCache() {
        alert("clear cache")
      }
    },
    watch: {
      offsetY(offsetY) {
        if (offsetY > 0) {
          this.ifHideShadow = false
        } else {
          this.ifHideShadow = true
        }
      }
    },
    data() {
      return {
        ifHideShadow: true
      }
    },

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .shelf-title {
    position: relative;
    z-index: 130;
    width: 100%;
    height: px2rem(42);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-shadow {
      box-shadow: none;
    }
    .shelf-title-text-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      @include columnCenter;
      .shelf-title-text {
        font-size: px2rem(16);
        line-height: px2rem(20);
        font-weight: bold;
        color: #333;
      }
      .shelf-title-sub-text {
        font-size: px2rem(10);
        color: #333;
      }
    }
    .shelf-title-btn-wrapper {
      position: absolute;
      top: 0;
      box-sizing: border-box;
      height: 100%;
      @include center;
      .shelf-title-btn-text {
        font-size: px2rem(14);
        color: #666;
      }
      .icon-back {
        font-size: px2rem(20);
        color: #666;
      }
      &.shelf-title-left {
        left: 0;
        padding-left: px2rem(15);
      }
      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(15);
      }
    }
  }
</style>
