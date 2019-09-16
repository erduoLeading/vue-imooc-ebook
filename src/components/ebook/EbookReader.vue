<template>
  <div class="ebook-reader" @clik="toggleTitleAndMenu">
    <div id="read">
      <div class="ebook-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd">
      </div>
    </div>
  </div>
</template>

<script>
  // 引入epubjs
  import Epub from 'epubjs'// 导入epub对象
  import {ebookMixin} from '../../utils/mixin' // mapActionsh和 mapGetters,computed(themeList)等共有数据
  import {getFontSize, saveFontSize, getFontFamily, saveFontFamily, getTheme, saveTheme, getLocation} from '../../utils/localStorage'
  import {flatten} from "../../utils/book";

  global.ePub = Epub
  export default {
    name: 'EbookReader',
    mixins: [ebookMixin],
    methods: {
      //书籍初始化：接收书籍文件名
      initFontSize() {
        let fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName,this.defaultFontSize)
          this.rendition.themes.fontSize(this.defaultFontSize)
        }else {
          this.setDefaultFontSize(fontSize)// 设置默认字体大小
          this.rendition.themes.fontSize(fontSize) // 渲染字体大小
        }
      },
      initFontFamily() {
        let fontFamily = getFontFamily(this.fileName)
        if (!fontFamily) {
          saveFontFamily(this.fileName,this.defaultFontFamily)
          this.rendition.themes.font(this.defaultFontFamily)
        }else {
          if(fontFamily == 'Microsoft YaHei'){
            this.setDefaultFontFamily('Default')// 设置默认字体
            this.rendition.themes.font(fontFamily) // 渲染字体
            return
          }
          this.setDefaultFontFamily(fontFamily)// 设置默认字体
          this.rendition.themes.font(fontFamily) // 渲染字体
        }
      },
      initTheme() {
        let defaultTheme = getTheme(this.fileName)
        if (!defaultTheme) {//默认保存
          defaultTheme = this.themeList[0].name
          saveTheme(this.fileName, defaultTheme)
        }
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)// 注册主题
        })
        this.setDefaultTheme(defaultTheme)
        this.rendition.themes.select(defaultTheme)

      },
      initRendition() {
        //渲染电子书
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default' //兼容微信正常使用
        })
        //获取location
        const location = getLocation(this.fileName)
        this.display(location, ()=>{
          this.initFontSize()// 初始化字体大小
          this.initFontFamily()// 初始化字体类型
          this.initTheme()// 初始化章节主题
          this.initGlobalStyle()// 初始化全局主题样式
          this.refreshLocation()// 初始化章节
        })

        // 导入初始字体
        this.rendition.hooks.content.register(contents => {
          // console.log("字体全部加载完",process.env.VUE_APP_RES_URL)
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
          ]).then(() => {
            // console.log(process.env.VUE_APP_RES_URL)
          })
        })
      },
      initGesture(){
        // 绑定手势
        this.rendition.on('touchstart',event => {
          // console.log(event)
          //获取到初始触碰的值
          this.startX = event.changedTouches[0].clientX
          this.startTime  = event.timeStamp
          // console.log(this.startX, this.startTime)
          //获取到初始的时间
        })
        this.rendition.on('touchend',event => {
          //计算放开时间与碰触时间的差值
          const x = event.changedTouches[0].clientX - this.startX
          const time = event.timeStamp -  this.startTime
          // console.log(x, time)
          //限制翻页
          if(x < -40 && time < 500){
            this.nextPage()
          }else if (x >  40 && time <500){
            this.prevPage()
          }else{
            this.toggleTitleAndMenu()
          }
          // event.preventDefault()
          event.stopPropagation()
        })
      },
      initEpub () {
        const url = `${process.env.VUE_APP_RES_URL}/epub/`+this.fileName + `.epub`
        //生成书对象
        this.book = new Epub (url)
        this.setCurrentBook(this.book)
        this.initRendition()// 初始化rendition
        this.initGesture()// 初始化手势
        this.parseBook() // 书籍的封面 标题 作者等
        // 当书籍加载完毕
        this.book.ready.then(() => {
          return this.book.locations.generate(750*(window.innerWidth/375)*getFontSize(this.fileName) / 16) //加载所有分页
            .then(() => {
              this.setBookAvailable(true)
              this.refreshLocation()
            })
        })


      },
      prevPage() {
        if (this.rendition){
          this.rendition.prev().then(() => {
            this.refreshLocation()// 刷新section
          })
          this.hideTitleAndMenu()
        }
      },
      nextPage() {
        if (this.rendition){
          this.rendition.next().then(() => {
            this.refreshLocation()// 刷新章节
          })
          this.hideTitleAndMenu()
        }
      },
      toggleTitleAndMenu() {
        if(!this.menuVisible){
          this.setSettingVisible(-1)
        }
        this.setFontFamilyVisible(false)
        this.setMenuVisible(!this.menuVisible)
      },
      parseBook() {
        this.book.loaded.cover.then(cover => {
          this.book.archive.createUrl(cover).then(url =>{
            this.setCover(url)
          })
        })
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        this.book.loaded.navigation.then(navigation => {
          //扁平化
          navigation = flatten(navigation.toc)
          //判断等级
          function find(item, level = 0) {
            !item.parent ? level : find(navigation.filter(parentItem => parentItem.id === parentItem[0]), ++level)
          }
          //定义等级
          navigation.forEach(item => {
            item.level = find(item)
          })
          this.setNavigation(navigation)
       })

      },
      move(e) {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.changedTouches[0].clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.changedTouches[0].clientY
        }
        e.preventDefault()
        e.stopPropagation()
      },
      moveEnd(e) {
        this.setOffsetY(0)
        this.firstOffsetY = null
      },
      onMaskClick(e) {
        if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
          return
        }
        const offsetX = e.offsetX
        const width = window.innerWidth
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPage()
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
      },


    },
    mounted () {
      // 提交文件名
      const fileName = this.$route.params.fileName.split('|').join('/')
      // 对提交进行初始化
      this.setFileName(fileName).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/global';
  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .ebook-reader-mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 150;
      background: transparent;
      width: 100%;
      height: 100%;

    }
  }

</style>
