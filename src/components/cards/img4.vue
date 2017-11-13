<template>
  <flexbox class="img4" >
    <flexbox-item v-for="(v,k) in card.pic_items" :link="v.openurl" :key="k" style="margin-left: 0.04rem">
      <a :href="v.openurl">
        <img  :src="v.src" width="100%"/>
        <p class="h4">{{v.txt}}</p>
      </a>
    </flexbox-item>
  </flexbox>
</template>
<script>
  import {Flexbox,FlexboxItem} from "vux/src/components/flexbox"
  export default {
    data() {
      return {};
    },
    name: 'img4',
    props: ['card'],
    components: {
      Flexbox,
      FlexboxItem,
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >
  .vux-flexbox.img4{
    padding: 0.1rem 0.12rem;
    margin-bottom: 0.1rem;

    .h4{
      text-align: center;
      font-size: 0.24rem;
      color: #404040;
    }
  }
</style>
