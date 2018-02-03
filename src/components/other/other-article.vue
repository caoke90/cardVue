<template>
  <article class="weibo-main">
    <div class="weibo-og">
      <div class="weibo-text" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="getBlogLink($event, card)" v-html="card.card_info.html"></div>
      <weibo-media :card="card"></weibo-media>
    </div>


  </article>
</template>
<style lang="scss" scoped="scoped">
  @import "../../scss/_sassCore";
  @import "../../scss/_var";
  .weibo-main{
    color: #507daf;
    .weibo-og{
      padding: 0.24rem 0.26rem;
      font-size: 0.34rem;
      color: #333;
      .weibo-text{
        line-height: 1.5;
        word-wrap: break-word;
      }
    }
  }
  @media screen and (min-width: 375px){
    .weibo-text{
      font-size: 17px;
    }
  }
  @media screen and (min-width: 540px){
    .weibo-text{
      font-size: 22px;
    }
  }
</style>
<script>
import Bus from '../../marvel/bus';

  export default{
    props: ['card'],
    components: {
      weiboMedia: require('./weibo-media.vue')
    },
    methods: {
      touchstart:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive=e.target;
        Bus.mActive.classList.add("m-active")

      },
      touchmove:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
          Bus.mActive=null
        }
      },
      getBlogLink(e, card) {
        if(e.target.nodeName!=="A"){
          const schemeClient = 'sinaweibo://detail?mblogid=' + card.strid;
          Bus.$emit("openScheme",schemeClient);
        }

      }
    }
  };
</script>
