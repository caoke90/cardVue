<template>
  <article class="weibo-main">
    <div class="weibo-og">
      <div class="weibo-text" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="getBlogLink($event, item)" v-html="item.card_info.html"></div>
      <weibo-media :item="item"></weibo-media>
    </div>


  </article>
</template>
<style lang="scss">
  @import "../../scss/_sassCore";
  @import "../../scss/_var";
  .card9 .weibo-main .weibo-og{
  	  padding: P2R(12px)  P2R(13px);
  }
</style>
<script>
import Bus from '../../marvel/bus';

  export default{
    props: ['item'],
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
      getBlogLink(e, item) {
        if(e.target.nodeName!=="A"){
          const schemeClient = 'sinaweibo://detail?mblogid=' + item.strid;
          Bus.$emit("openScheme",schemeClient);
        }

      }
    }
  };
</script>
