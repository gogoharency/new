<template>
    <div class="on rightMenu" @click="hideRight">
        <ul class="rightMenu_c on" @click.stop>
            <li @click="Save">
              <img src="../assets/saveon.png" alt="" v-if="saved">
              <img src="../assets/save.png" alt="" v-else>
              收藏
            </li>
            <li @click="goPrev">
              <img src="../assets/prev.png" alt="">
              前一天
            </li>
            <li @click="goRandom">
              <img src="../assets/suiji.png" alt="">
              随机
            </li>
            <div v-if="isToday">
              <li @click="goNext">
                <img src="../assets/next.png" alt="">
                后一天
              </li>
              <li @click="getToday">
                <img src="../assets/today.png" alt="">
                今日
              </li>
            </div>
          </ul>
    </div>
</template>

<style scoped>
  .rightMenu{
    position: fixed;
    background-color:transparent;
    color: rgb(143, 136, 136);
    text-align: center;
    height: 100%;
    width: 100%;
    top: 0;
    transition:background .3s,left 0s .3s;
    font-size: .25rem;
    left:100%;
  }
  .R.on{
    background-color: rgba(221, 221, 97, 0.25);
    left:0;
    transition:background .3s,left 0s;
  }
  .R .rightMenu_c.on{
    right:0;
  }
  .rightMenu_c{
    position: absolute;
    background-color: rgb(42,42,41);
    height: 100%;
    width: 26%;
    top: 0;
    right:-26%;
    padding-top: 8%;
    transition: .3s;
  }
  .rightMenu_c li {
    padding: .15rem 0;
  }
  .rightMenu_c img{
    width: .65rem;
    display: block;
    margin: 5px auto;
  }
</style>

<script>
export default {
  props: ['article', 'save'],
  data () {
    return {
      saved: this.save,
      now: ''
    }
  },
  watch: {
    save () {
      this.saved = this.save
    }
  },
  beforeUpdate () {
    this.now = this.article.date.curr
  },
  computed: {
    isToday () {
      console.log()
      return this.now < new Date().Format('yyyyMMdd')
    }
  },
  methods: {
    Save () {
      this.saved = !this.saved
      if (this.saved) {
        var saveArticle = {}
        saveArticle.title = this.article.title
        saveArticle.author = this.article.author
        saveArticle.date = this.article.date.curr
        this.$emit('Save', saveArticle)
      } else {
        this.$emit('removeSave', this.article.title)
      }
    },
    goPrev () {
      this.$emit('article', this.article.date.prev)
    },
    goRandom () {
      this.$emit('random')
    },
    goNext () {
      this.$emit('article', this.article.date.next)
    },
    getToday () {
      this.$emit('today', this.article.date.curr)
    },
    hideRight () {
      this.$emit('hidee', false)
    }
  }
}
</script>