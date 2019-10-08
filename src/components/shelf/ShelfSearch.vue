<template>
  <div class="shelf-search-wrapper"
       :class="{
         'search-top': ifInputClicked,
         'hide-shadow': ifHideShadow
       }">
    <div class="shelf-search"
         :class="{'searchTop':ifInputClicked}" >
      <!--搜索组件-->
      <div class="search-wrapper">
        <!--搜索图标-->
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <!--搜索框-->
        <div class="search-input-wrapper">
          <input type="text" class="search-input"
                 :placeholder="$t('shelf.search')"
                 @click="onSearchClick"
                 v-model="searchText">
        </div>
        <!--清除按钮-->
        <div class="icon-clear-wrapper"
        @click="clearSearchText"
        v-if="searchText.length > 0">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <!--中英文切换按钮:当ifInputClicked为true代表被点击，被点击代表不显示(即取反)-->
      <div class="icon-locale-wrapper" v-if="!ifInputClicked"
      @click="switchLocale">
        <span class="icon-cn icon" v-if="lang === 'cn'" ></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <!--取消按钮-->
      <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <transition name="hot-search-move">
      <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
        <div class="shelf-search-tab-item" v-for="item in tabs"
             @click="onTabClick(item.id)">
          <span class="shelf-search-tab-text" :class="{'is-selected': item.id=== selectedTab}">{{item.text}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import  { setLocalStorage } from '../../utils/localStorage'
  import  { storeShelfMixin } from '../../utils/mixin'
  export default {
    mixins: [storeShelfMixin],
    watch: {
      offsetY(offsetY) {
        if (offsetY > 0 && this.ifInputClicked) {
          this.ifHideShadow = false
        } else {
          this.ifHideShadow = true
        }
      }
    },
    computed: {
      lang() {
        return this.$i18n.locale
      },
      tabs() {
        return [
          {
            id: 1,
            text: this.$t('shelf.default'),
          },
          {
            id: 2,
            text: this.$t('shelf.progress'),
          },
          {
            id: 3,
            text: this.$t('shelf.purchase'),
          }
        ]
      }
    },
    data () {
      return {
        ifInputClicked: false,
        searchText: '',
        top:42,
        selectedTab: 1,
        ifHideShadow: true
      }
    },
    methods: {
      //点击搜索框
      onSearchClick() {
        this.ifInputClicked = true
        this.setShelfTitleVisible(false) //隐藏标题
      },
      onCancelClick() {
        this.ifInputClicked = false
        this.setShelfTitleVisible(true) //显示标题
      },
      switchLocale() {
        if(this.lang === 'en') {
          this.$i18n.locale = 'cn'
        }else {
          this.$i18n.locale = 'en'
        }
        setLocalStorage('local', this.$i18n.locale)
      },
      clearSearchText() {
        this.searchText = ''
      },
      onTabClick(id) {
        this.selectedTab = id
      }

    }
  }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/global';
    .shelf-search-wrapper {
      position: relative;
      z-index: 105;
      width: 100%;
      height: px2rem(94);
      font-size: px2rem(16);
      background: white;
      box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
      &.hide-shadow {
        box-shadow: none;
      }
      &.search-top {
        position: fixed;
        left:0 ;
        top: 0;
      }
      .shelf-search {
        position: absolute;
        top: px2rem(42);
        left: 0;
        z-index: 105;
        display: flex;
        width: 100%;
        height: px2rem(52);
        transition: top $animationTime linear;
        &.searchTop {
          top: 0;
          z-index: 150;
        }
        /*搜索框*/
      .search-wrapper {
        flex: 1;
        display: flex;
        margin: px2rem(8) 0 px2rem(8) px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(3);
        .icon-search-wrapper {//搜索图标
          flex: 0 0 px2rem(22); //占主轴的22rem
          @include right;
          .icon-search {
            font-size: px2rem(12);
          }
        }
        .search-input-wrapper {// 搜索框
          flex: 1;// 占主轴的剩余空间全部
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include center;
          .search-input {
            width: 100%;
            border: none;
            color: #333;
            font-size: px2rem(14);
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: px2rem(14);
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper {// 清空按钮
          flex: 0 0 px2rem(24);// 占主轴的24rem
          @include left;
          .icon-close-circle-fill{
            font-size: px2rem(14);
            color: #ccc;
          }
        }

      }
        /*语言按钮*/
      .icon-locale-wrapper {
        flex: 0 0 px2rem(55);
        @include center;
        .icon-cn .icon-en {
          font-size: px2rem(22);
          color: #666;
        }
      }
        /*取消按钮*/
      .cancel-btn-wrapper {
        flex: 0 0 px2rem(55);
        @include center;
          .cancel-text{
            font-size: px2rem(14);
            color: $color-blue;
          }
        }
    }
      .shelf-search-tab-wrapper {
        position: absolute;
        top: px2rem(52);
        left: 0;
        z-index: 105;
        display: flex;
        width: 100%;
        height: px2rem(42);
        .shelf-search-tab-item {
          flex: 1;
          @include center;
          .shelf-search-tab-text {
            font-size: px2rem(12);
            color:#999;
            &.is-selected {
              color: $color-blue;
            }
          }
        }
      }
  }
</style>
