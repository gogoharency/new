<template>
  <div id="app"
   :style="{'background-color': Ibg}"
   :class="{ marL: leftmenu,Inight: night }"
   v-on="{click:hideMenu,touchstart:ts,touchmove:tm,touchend:te}">
<!--     <img src="./assets/logo.png"> -->
    <header id="header">
      <img src="./assets/menu.png" @click.stop="leftMenus">
      <img src="./assets/portmenu.png"  @click.stop="rightMenus">
    </header>
    <leftMenu
     v-on="{setting:Setting,showSave:showSave}"
     :class="{ L : leftmenu }"
     ></leftMenu>
    <rightMenu
     :article="article"
     :save="isSaved"
     v-on="{
      hidee:hideRight, 
      Save:Save, 
      removeSave:removeSave,
      article:NPArticle, 
      random:randomArticle, 
      today:getArticle}" 
     :class="{ R : rightmenu }"
     ></rightMenu>
    <router-view :article1="article" :night="night"></router-view>
    <setting
     v-on="{setSize:setSize, setNight:setNight,setBg: setBg}" 
     :class="{hideSetting:setting}"
     ></setting>
    <saveArticle v-on="{hide:showSave,go:NPArticle}" :saveArticles="saveTotal" :class="{showSave :showS}"></saveArticle>
    <transition name="sc">
      <span class="SC" v-if="isSC">{{ issc ? '收藏成功' : '取消收藏' }}</span>
    </transition>
    {{ this.$store.state.articleSave }}
    {{ aa }}
    {{ this.$store.getters.toUp }}
    {{ toUp }}
    <button @click="ttt">切换</button>
   <!--  在vuex中用commit，不用emit -->
   {{ articleSave }}
  </div>
</template>

<script>
import rem from '../static/rem'
import storage from '../static/storage'
import leftMenu from '~/leftMenu'
import rightMenu from '~/rightMenu'
import setting from '~/setting'
import saveArticle from '~/saveArticle'
import {mapState,mapGetters} from 'vuex'
export default {
  name: 'app',
  created () {
    rem.defaultFontSize
    if (storage.get('articles')) {
      if (storage.get('articles').length > 0) {
        this.saveTotal = storage.get('articles')
      }
    }
    this.wWidth = window.innerWidth
  },
  mounted () {
    this.getArticle()
  },
  data () {
    return {
      article: '',
      leftmenu: false,
      rightmenu: false,
      night: false,
      setting: false,
      Ibg: '#fafafa',
      saveTotal: [],
      showS: false,
      isSC: false,
      issc: true,
      wWidth: '',
      touchPoint: {}
    }
  },
  components: {
    leftMenu,
    rightMenu,
    setting,
    saveArticle
  },
  methods: {
  //vuex参数
  ttt () {
    //this.$store.commit('changeSave', 'xx')
    this.$store.dispatch('changeSave')
    console.log(0)
  },
  // 手指滑动
    ts (e) {
      var point = e.targetTouches[0].clientX
      this.touchPoint.startX = point
    },
    tm (e) {
      // e.preventDefault()
      var point = e.targetTouches[0]
      this.touchPoint.stopX = point.clientX
      if (this.leftmenu || this.rightmenu) {
        e.preventDefault()
      }
    },
    te (e) {
      // e.preventDefault()
      var distand = this.touchPoint.stopX - this.touchPoint.startX
      if (distand > 20 && !this.leftmenu) {
        if (this.touchPoint.startX <= this.wWidth / 4 && !this.rightmenu) {
          this.leftMenus()
        }
        this.rightmenu = false
      } else if (distand < -20) {
        if (this.leftmenu) {
          this.leftMenus()
        } else {
          if (this.touchPoint.startX >= this.wWidth * 3 / 4 && !this.leftmenu) {
            this.rightMenus()
          }
        }
      }
      this.touchPoint = {}
    },
  // 左右菜单栏
    leftMenus () {
      this.leftmenu = !this.leftmenu
      if (this.leftmenu) {
        document.body.style.overflow = 'hidden'
        // document.body.addEventListener('touchmove', function (event) { event.preventDefault() }, false)
      } else {
        setTimeout(() => {
          document.body.style.overflow = 'auto'
        }, 300)
      }
    },
    rightMenus () {
      this.rightmenu = !this.rightmenu
      document.body.style.overflow = 'hidden'
    },
    hideMenu () {
      if (this.rightmenu || this.leftmenu || this.setting) {
        this.leftmenu = false
        this.rightmenu = false
        this.setting = false
      }
      document.body.style.overflow = 'auto'
    },
    showSave (val) {
      if (val !== '') {
        document.body.style.overflow = 'auto'
      }
      this.leftmenu = false
      this.showS = !this.showS
    },
    hideRight () {
      this.rightmenu = false
    },
    // 可否滑动
  // 获取文章
    getArticle () {
      this.rightmenu = false
      this.$ajax({
        methods: 'get',
        // baseURL: '/article',
        // url: 'today',
        url: 'https://interface.meiriyiwen.com/article/today',
        params: {
          dev: 1
        }
      }).then((res) => {
        this.article = res.data.data
      })
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    NPArticle (data) {
      this.rightmenu = false
      if (data > new Date().Format('yyyyMMdd')) {
        alert('已是最后一天，请浏览之前的文章')
        return
      }
      document.body.style.overflow = 'auto'
      this.showS = false
      this.$ajax({
        methods: 'get',
        // baseURL: '/article',
        // url: 'day',
        url: 'https://interface.meiriyiwen.com/article/day',
        params: {
          dev: 1,
          date: data
        }
      }).then((res) => {
        this.article = res.data.data
      })
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    randomArticle () {
      this.rightmenu = false
      this.$ajax({
        methods: 'get',
        // baseURL: '/article',
        // url: random',
        url: 'https://interface.meiriyiwen.com/article/random',
        params: {
          dev: 1
        }
      }).then((res) => {
        this.article = res.data.data
      })
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    Save (data) {
      this.isSC = true
      this.issc = true
      setTimeout(() => {
        this.isSC = false
      }, 500)
      this.rightmenu = false
      this.saveTotal.unshift(data)
      storage.set('articles', this.saveTotal)
    },
    removeSave (data) {
      this.isSC = true
      this.issc = false
      setTimeout(() => {
        this.isSC = false
      }, 500)
      this.rightmenu = false
      for (let item in this.saveTotal) {
        if (this.saveTotal[item].title === data) {
          this.saveTotal.splice(item, 1)
        }
      }
      storage.set('articles', this.saveTotal)
    },
  // 阅读设置
    Setting () {
      document.body.style.overflow = 'auto'
      this.setting = true
      this.leftmenu = false
    },
    setSize (val) {
      document.querySelector('.content').style.fontSize = val
    },
    setBg (val) {
      this.night = false
      this.Ibg = val
    },
    setNight () {
      this.night = !this.night
    }
  },
  computed: {
    isSaved () {
      for (let item in this.saveTotal) {
        if (this.saveTotal[item].title === this.article.title) {
          return true
        }
      }
      return false
    },
    // ...mapState([
    //   'aa',
    //   'articleSave'
    // ]),
    // {{}}和v-text调用直接取值，其他要加this
    ...mapState({
      aa: (state) => state.aa,
      aa: 'aa',
      articleSave: 'articleSave'
    }),
    ...mapGetters([
      'toUp'
    ])
  }
}
</script>

<style>
 @import '../static/normal.css';
  [v-cloak]{
    display: none;
  }
  *{
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
  }
  body{
    font-size: .35rem;
    margin: 0 auto;
    user-select: none;
  }
  ul li{
    list-style: none;
  }
  img{
    cursor: pointer;
  }
  .Inight{
    background:#444 !important;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
    transition: .3s;
    width: 100%;
    background: #fafafa;
  }
  #header{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding:.15rem .2rem;
    position: fixed;
    top: 0;
    width: 100%;
    background: inherit;
  }
  .marL{
    margin-left: 40%;
  }
  .content_c p{
    text-indent: 2em;
    line-height: .5rem;
    margin: .4rem 0 .2rem;
    /*font-weight: 600;*/
  }
  .hideSetting {
    bottom:0 !important;
  }
  div.showSave {
    opacity: 1 !important;
    top: 0 !important;
    left: 0 !important;
    transition:opacity .3s,top .3s, left 0s !important;
  }
  .SC{
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.8);
    border-radius: 8px;
    color: #fff;
    padding: .3rem .6rem;
  }
  .sc-leave-active{
    transition: .1s .2s;
  }
  .sc-enter-active{
    transition: .1s;
  }
  .sc-enter,.sc-leave-to{
    opacity: 0;
  }
</style>
