<template>
    <div class="content" v-cloak :class="{c_night: night}">
        <h2 class="title">{{ article1.title }}</h2>
        <hr>
        <p class="author">{{ article1.author }}</p>
        <div class="content_c" v-html="article1.content"></div>
        <hr>
        <footer>
          全文完  共{{ article1.wc }}字
        </footer>
    </div>
</template>

<style scoped>
[v-cloak]{
  display: none;
}
.content{
  text-align: center;
  box-sizing: border-box;
  padding: .2rem;
  margin-top: .8rem;
}
@media screen and (min-width: 390px) {
  .content{
    margin-top: .6rem;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
.content_c{
  text-align: left;
}
.title{
  font-weight: 400;
  margin: 0 0 .2rem;
}
.author, footer{
  color: #8c8768;
  margin: .2rem 0;
}
.c_night{
  color:#969fa8;
}
</style>

<script>
export default {
  props: ['article1', 'night']
}
</script>