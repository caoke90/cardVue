<template>
  <div class="card31" @click="openUrl(card.scheme)" v-if="card">
    <p class="agotime">{{card.title}}</p>
    <div class="time">
      <span class="t_c" :style="{'color':warning?card.number_warning_color:card.number_color }">{{d}}</span><span class="t_t" :style="{'color':card.unit_color }">天</span>
      <span class="t_c" :style="{'color':warning?card.number_warning_color:card.number_color }">{{h}}</span><span class="t_t" :style="{'color':card.unit_color }">时</span>
      <span class="t_c" :style="{'color':warning?card.number_warning_color:card.number_color }">{{m}}</span><span class="t_t" :style="{'color':card.unit_color }">分</span>
      <span class="t_c" :style="{'color':warning?card.number_warning_color:card.number_color }">{{s}}</span><span class="t_t" :style="{'color':card.unit_color }">秒</span>
    </div>
  </div>
</template>

<script>
  import Bus from '../../marvel/bus';
  export default {
    name: "card31",
    props: ['card'],
    data() {
      return {
        d: "",
        h: "",
        m: "",
        s: "",
        warning: false
      }
    },
    methods: {
      openUrl:function (url) {
        if(url){
          Bus.$emit("openScheme",url);
        }
      },
      init() {
        var t = this.card.diff_endtime;
        var setInter = setInterval(() => {
          if(0 > this.card.diff_warningtime) {
            this.warning = true;
          }
          var d = 0;
          var h = 0;
          var m = 0;
          var s = 0;
          if(t > 0) {
            d = Math.floor(t / 60 / 60 / 24);
            h = Math.floor(t / 60 / 60 % 24);
            m = Math.floor(t / 60 % 60);
            s = Math.floor(t % 60);
          } else {
            clearInterval(setInter);
          }
          this.d = d;
          this.h = h < 10 ? '0' + h : h;
          this.m = m < 10 ? '0' + m : m;
          this.s = s < 10 ? '0' + s : s;
          t--;
          this.card.diff_warningtime--;
        }, 1000);
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style type="text/css" lang="less" scoped>
  .card31 {
    background: white;
    box-sizing: border-box;
    width: 100%;
    padding: 0rem 0.5rem;
    .agotime {
      font-size: 0.28rem;
      padding: 0.12rem 0rem;
      color: #565656;
    }
    .time {
      border-top: 2px solid #f6f6f6;
      font-size: 0.28rem;
      text-align: center;
      padding-bottom: 0.3rem;
      .t_c {
        font-size: 0.9rem;
        color: #333;
      }
      .t_t {
        font-size: 0.36rem;
        color: #333;
      }
    }
  }
</style>
