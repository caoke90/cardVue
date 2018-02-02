<template>
  <weibo :card="card.weibo_info"></weibo>
</template>
<script>
  export default {
    data() {
      return {};
    },
    name: "card100",
    props: ['card'],
    components: {
      weibo:require("../other/weibo.vue")
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >

</style>
