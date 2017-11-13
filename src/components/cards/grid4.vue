<template>
  <grid class="grid4" >
    <grid-item v-for="(v,k) in card.pic_items" :link="v.openurl" :key="k">

        <img slot="icon" :src="v.src"/>
        <span slot="label">{{v.txt}}</span>

    </grid-item>
  </grid>
</template>
<script>
  import {Grid,GridItem} from "vux/src/components/grid"

  export default {
    data() {
      return {};
    },
    name: 'grid4',
    props: ['card'],
    components: {
      Grid,
      GridItem
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >

</style>
