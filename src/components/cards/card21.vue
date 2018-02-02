<template>
  <card20 :card="card"></card20>
</template>
<script>
  import Bus from '../../marvel/bus';
  export default {
    data() {
      return {

      };
    },
    name: "card21",
    props: ['card'],
    components: {
      "card20":require("./card20.vue")
    },
    created:function () {
      //四图card
      this.card.col=4;
    },

  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
</style>
