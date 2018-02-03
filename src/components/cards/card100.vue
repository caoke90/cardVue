<template>
  <other :card="card.weibo_info"></other>
</template>
<script>
  export default {
    data() {
      return {};
    },
    name: "card100",
    props: ['card'],
    components: {
      other:require("../other/other.vue")
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >

</style>
