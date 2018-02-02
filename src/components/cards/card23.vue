<template>
  <div class="card card23">
    <a @click="openUrl(card.scheme)" class="m-btn m-btn-block m-btn-white" :class="[card.show_color,{'m-btn-disabled': !card.scheme }]">{{card.desc}}</a>

  </div>
 </template>
<script>
  import Bus from '../../marvel/bus';
  export default {
    data() {
      return {};
    },
    name: "card23",
    props: ['card'],
    components: {
    },
    methods: {
      openUrl:function (url) {
        if(url){
          Bus.$emit("openScheme",url);
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">

</style>
