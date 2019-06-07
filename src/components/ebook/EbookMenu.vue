<template>
  <div>
    <div class="menu-bar" >
      <transition name="slide-up">
        <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}" v-show="menuVisible">
          <div class="icon-wrapper">
            <span class="icon-menu " @click="showSetting(3)"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-progress" @click="showSetting(2)"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-bright" @click="showSetting(1)"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-A1" @click="showSetting(0)"></span>
          </div>
        </div>
      </transition>
    </div>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-pop-up></ebook-setting-font-pop-up>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
  </div>

</template>

<script>
  import EbookSettingFont from './EbookSettingFont'
  import EbookSettingTheme from './EbookSettingTheme'
  import {ebookMixin} from '../../utils/mixin'
  import EbookSettingFontPopUp from  './EbookSettingFontPopUp'
  import EbookSettingProgress from  './EbookSettingProgress'
  export default {
    mixins: [ebookMixin],
    components:{
      EbookSettingFont,
      EbookSettingFontPopUp,
      EbookSettingTheme,
      EbookSettingProgress
    },
    methods: {
      showSetting(index){
        if(index === this.settingVisible){
          this.setSettingVisible(-1)
          return
        }
        this.setSettingVisible(index)
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/global';
    .menu-bar {
      .menu-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 102;
        display: flex;
        width: 100%;
        height: px2rem(48);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
        font-size: px2rem(20);
        &.hide-box-shadow {
          box-shadow: none;
        }
        .icon-wrapper {
          flex: 1;
          @include center;
          .icon-progress {
            font-size: px2rem(24);
          }
          .icon-bright {
            font-size: px2rem(22);
          }
        }
      }
      .setting-wrapper {
        position: absolute;
        bottom: px2rem(48);
        left: 0;
        z-index: 101;
        width: 100%;
        height: px2rem(90);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
        .setting-theme {
          height: 100%;
          display: flex;
          .setting-theme-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: px2rem(5);
            box-sizing: border-box;
            .preview {
              flex: 1;
              border: px2rem(1) solid #ccc;
              box-sizing: border-box;
              &.no-border {
                border: none;
              }
            }
            .text {
              flex: 0 0 px2rem(20);
              font-size: px2rem(14);
              color: #ccc;
              @include center;
              &.selected {
                color: #333;
              }
            }
          }
        }
        .setting-progress {
          position: relative;
          width: 100%;
          height: 100%;
          .progress-wrapper {
            width: 100%;
            height: 100%;
            @include center;
            padding: 0 px2rem(30);
            box-sizing: border-box;
            .progress {
              width: 100%;
              -webkit-appearance: none;
              height: px2rem(2);
              background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
              background-size: 0 100%;
              &:focus {
                outline: none;
              }
              &::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: px2rem(20);
                width: px2rem(20);
                border-radius: 50%;
                background: white;
                box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
                border: px2rem(1) solid #ddd;
              }
            }
          }
          .text-wrapper {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            color: #333;
            font-size: px2rem(12);
            text-align: center;
          }
        }
      }
    }
</style>
