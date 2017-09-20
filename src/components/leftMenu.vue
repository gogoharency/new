<template>
    <div class="leftMenu" @click.stop>
        <ul class="leftMenu_c">
          <li @click="goSaves">我的收藏</li>
          <hr>
          <li @click="emitSet">阅读设置</li>
          <hr>
          <li>给个好评</li>
          <hr>
        </ul>
    </div>
</template>

<style scoped>
.leftMenu{
  position: fixed;
  width: 40%;
  background-color: rgb(42,42,41);
  color: rgb(143, 136, 136);
  text-align: center;
  height: 100%;
  top: 0;
  left: -40%;
  padding-top: 5%;
  transition: .3s;
}
.L.leftMenu{
  left:0;
}
.leftMenu_c li {
  padding: .3rem 0;
}
.leftMenu hr{
  border: 1px solid #444;
  /*background: rgb(43,43,43);*/
  /*box-shadow: 0 1px 1px #ccc inset;*/
}
</style>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goSaves () {
      this.$emit('showSave')
    },
    emitSet () {
      this.$emit('setting')
    }
  }
}
</script>