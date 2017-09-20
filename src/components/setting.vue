<template>
    <div class="setting" @click.stop>
        <ul class="setting_c">
          <li class="fontSize">
            <span>字号</span>
            <div>
              <span v-for="(size,index) in fontSize" @click="setSize(index)" :class="{ on : index == defaultSize}" :key="size.content">{{ size.content }}</span>
            </div>
          </li>
          <li class="bg">
            <span>背景</span>
            <div>
              <span v-for="(bgc,index) in bg" @click="setBg(index)" :key="bgc" :style="{'background-color':bgc}"><span v-show="index == defaultBg">√</span></span>
            </div>
          </li>
          <li class="night">
            <span>夜间</span>
            <div @click="setNight" :class="{ on: night}">
              开关
            </div>
          </li>
        </ul>
    </div>
</template>

<style scoped>
  .setting{
    position: fixed;
    bottom: -100%;
    background-color:#fff;
    width: 100%;
    z-index: 3;
    padding: .2rem .3rem;
    box-sizing: border-box;
    font-size: .3rem;
    transition: .3s;
  }
  .setting_c li{
    display: flex;
    justify-content: space-between;
    padding: .2rem 0;
  }
  .setting_c li div{
    width: 70%;
    display: flex;
    justify-content: center;
    border: .01rem solid #000;
    border-radius: 5px;
  }
  .setting_c li > span{
    color: rgb(143, 136, 136)
  }
  .setting_c li div span{
    display: block;
    flex: 1;
    text-align: center;
  }
  .setting_c .fontSize div span{
    padding: .1rem 0;
  }
  .setting_c .fontSize div span.on{
    background: #000;
    color: #fff;
  }
  .setting_c .fontSize div span:nth-child(2){
    border-left: 1px solid #000; 
    border-right: 1px solid #000; 
  }
  .setting_c .bg div,.setting_c .night div{
    border-color: transparent;
  }
  .setting_c .bg div{
    /*font-size: 0;*/
    justify-content: space-around;
  }
  .setting_c .bg div>span{
    border-radius: 50%;
    width: .5rem;
    height: .5rem;
    line-height: .5rem;
    flex: none;
    border:1px solid #939393;
  }
  .setting_c .night div{
    width: .8rem;
    padding: .1rem;
    border-radius: 30px;
    border: 2px solid #ccc;
    transition: .3s;
  }
  .setting_c .night div.on{
    background: #000;
    color: #fff;
    border-color: #000;
  }
</style>

<script>
export default {
  data () {
    return {
      fontSize: [
        {content: '小', val: '0.3rem'},
        {content: '中', val: '0.35rem'},
        {content: '大', val: '0.4rem'}
      ],
      bg: ['#fafafa', 'rgb(207, 249, 235)', 'rgb(241,229,201)', 'rgb(253, 214, 246)'],
      defaultSize: 1,
      defaultBg: 0,
      night: false
    }
  },
  methods: {
    setSize (index) {
      this.defaultSize = index
      this.$emit('setSize', this.fontSize[index].val)
    },
    setBg (index) {
      this.defaultBg = index
      this.night = false
      // this.$emit('setNight')
      this.$emit('setBg', this.bg[index])
    },
    setNight () {
      this.night = !this.night
      this.$emit('setNight')
    }
  }
}
</script>