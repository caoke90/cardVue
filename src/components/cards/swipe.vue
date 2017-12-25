
<template>
  <swiper class="vux-swipe" :height="card.height" :auto="true" :aspect-ratio="300/800">
    <swiper-item class="swiper-demo-img" v-model="card.defaultIndex" v-for="(item, index) in card.pic_items" :key="index">
      <img :src="item.src">
    </swiper-item>
  </swiper>
</template>
<script>
  import {Swiper,SwiperItem} from 'vux/src/components/swiper'


  export default {
    name: "card3",
    props: ['card'],
    components: {
      Swiper,SwiperItem
    },
    methods: {
    }
  };
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss" >
  .vux-swipe.vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-swipe.vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
    background-color: #ff9900;
  }
  .swiper-demo-img img {
    width: 100%;
  }
</style>
