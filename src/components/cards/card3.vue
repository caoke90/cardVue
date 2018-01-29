
<template>
  <div class="card card3">
    <swiper class="vux-swipe" :height="card.height" :auto="true" :aspect-ratio="300/800">
      <swiper-item class="swiper-demo-img" v-model="card.defaultIndex" v-for="(item, index) in card.pic_items"  :key="index">
        <img :src="item.src" @click="openUrl(item)">
      </swiper-item>
    </swiper>
  </div>

</template>
<script>
  import {Swiper,SwiperItem} from 'vux/src/components/swiper'
  import Bus from '@/marvel/bus';


  export default {
    name: "card3",
    props: ['card'],
    components: {
      Swiper,SwiperItem
    },
    methods: {
      openUrl:function (item) {
        if(item.openurl){
          Bus.$emit("openScheme",item.openurl);
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss" >
  .vux-swipe.vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-swipe.vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
    background-color: #ff9900;
  }
  .swiper-demo-img img {
    width: 100%;
    position: relative;
    top:50%;
    -webkit-transform:translateY(-50%);
  }
</style>
