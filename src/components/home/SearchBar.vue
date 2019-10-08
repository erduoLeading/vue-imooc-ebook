<template>
  <div>
    <div class="search-bar"
         :class="{'hide-title':!titleVisible,
                'hide-shadow': !shadowVisible,
               }">
      <!--先下移后隐藏-->
      <transition name="title-move">
        <div class="search-bar-title-wrapper"
             v-show="titleVisible">
          <div class="title-icon-text-wrapper">
            <span class="title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper"
           :class="{'hide-title': !titleVisible}"
           @click="back">
        <span class="icon-back icon"></span>
      </div>
      <div class="search-bar-input-wrapper"
           :class="{'hide-title': !titleVisible}">
        <div class="search-bar-blank"
             :class="{'hide-title': !titleVisible}"
            ></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input class="input"
                 type="text"
                 :placeholder="$t('home.hint')"
                 v-model="searchText"
                 @click="showHotSearch"
                 @keyup.13.exact="search">
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
    </div>
</template>

<script>
  import { storeHomeMixin } from "../../utils/mixin";
  import HotSearchList  from  './HotSearchList'

  export default {
    mixins:[storeHomeMixin],
    components: {
      HotSearchList,

    },
    data () {
      return {
        searchText: '',
        titleVisible: true,
        shadowVisible: true,
        hotSearchVisible: false
      }
    },
    watch: {
      offsetY(offsetY) {
        if (offsetY > 0) {
            this.hideTitle()
            this.hideShadow()
        } else {
          this.showTitle()
          this.showShadow()
        }
      },
      hotSearchOffsetY (offsetY) {
        if (offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
      }
    },
    methods: {
      showFlapCard() {
        this.setFlapCardVisible(true)
      },
      back () {
        if (this.offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
        if(this.hotSearchVisible) {
          this.hideHotSearch()
        } else  {
          this.$router.push({
            path: '/store/shelf'
          })
        }

      },
      showHotSearch () {
        this.hotSearchVisible = true
        this.hideTitle()
        this.$nextTick(()=>{
          this.$refs.hotSearch.reset()
        })
      },
      hideHotSearch () {
        this.showTitle()
        this.hotSearchVisible = false
      },
      hideTitle () {
        this.titleVisible = false
        this.hideShadow()
      },
      showTitle () {
        this.titleVisible = true
      },
      hideShadow () {
        this.shadowVisible = false
      },
      showShadow () {
        this.shadowVisible = true
      },
      search () {
        //跳转
        this.$router.push({
          path: '/store/list',
          query: {
            keyword: this.searchText
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/global';
    .search-bar {
      position: relative;
      z-index: 150;
      height: px2rem(94);
      box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .2);

      &.hide-title {
        height: px2rem(52);
      }
      &.hide-shadow {
        box-shadow: none;
      }
      .search-bar-title-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: px2rem(42);
        .title-icon-text-wrapper {
          width: 100%;
          height: px2rem(42);
          @include center
        }
        .title-icon-shake-wrapper {
          position: absolute;
          top: 0;
          right: px2rem(15);
          height: px2rem(42);
          @include center
        }
      }
      .title-icon-back-wrapper {
        position: absolute;
        top: 0;
        z-index: 200;
        left: px2rem(15);
        height: px2rem(42);
        @include center;
        transition: height $animationTime $animationType;
        &.hide-title {
          height: px2rem(52);
        }
      }
      .search-bar-input-wrapper {
        position: absolute;
        top: px2rem(42);
        left: 0;
        display: flex;
        width: 100%;
        height: px2rem(52);
        padding: px2rem(10);
        box-sizing: border-box;
        transition: top $animationTime $animationType;
        &.hide-title {
          top: 0;
        }
        .search-bar-blank {
          flex: 0;
          width: 0;
          transition: all $animationTime $animationType;
          &.hide-title {
            flex: 0 0 px2rem(31);
            width: px2rem(31);
          }
         }
        .search-bar-input {
          width: 100%;
          background: #f4f4f4;
          border-radius: px2rem(20);
          padding: px2rem(5) px2rem(15);
          box-sizing: border-box;
          border: px2rem(1) solid #eee;
          @include left;
          .icon-search {
            color: #999;
          }
          .input {
            width: 100%;
            border: none;
            background: transparent;
            margin-left: px2rem(10);
            font-size: px2rem(12);
            color: #666;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder{
              color: #ccc;
            }
          }
        }
      }
    }

</style>
