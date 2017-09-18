<template>
    <div class="saveArticle">
        <header id="header">
          <img src="../assets/back.png" @click="hideCur">
        </header>
        <div class="saveArticle_c">
          <ul>
            <li v-for="item in saveArticles" @click="goArticle(item.date)">
              <span class="title">{{ item.title }}</span>
              <span class="author">{{ item.author }}</span>
            </li>
          </ul>
        </div>
    </div>
</template>

<style scoped>
  .saveArticle{
    position: fixed;
    box-sizing: border-box;
    top: 10%;
    background: #fafafa;
    width: 100%;
    height: 100%;
    font-size: .35rem;
    opacity: 0;
    left: 100%;
    transition:opacity .3s,top .3s, left 0s .3s;  }
   #header{
    position: absolute;
  }
  .saveArticle_c{
    box-sizing: border-box;
    padding: 0 .2rem;
    margin-top: .8rem;
  }
  .saveArticle_c ul li{
    border-bottom: 1px solid #ccc;
    padding: .2rem 0;
    display: flex;
    justify-content: space-between;
  }
  .saveArticle_c ul li .author{
    font-size: .3rem;
    color:#ccc;
  }
</style>

<script>
export default {
  props: ['saveArticles'],
  data () {
    return {
      Articles: [
      ]
    }
  },
  methods: {
    goArticle (data) {
      this.$emit('go', data)
    },
    hideCur () {
      this.$emit('hide', 1)
    }
  }
}
</script>