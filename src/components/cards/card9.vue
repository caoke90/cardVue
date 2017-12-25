<template>
  <weibo :card="card.weibo_info" v-if="card.weibo_info.mid"></weibo>
</template>
<script>
  export default {
    data() {
      return {};
    },
    name: "card9",
    props: ['card'],
    components: {
      weibo:require("../weibo/weibo.vue")
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >

</style>
