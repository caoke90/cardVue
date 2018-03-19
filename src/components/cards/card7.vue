<template>
  <div class="card7">
    <card v-for="(v,k) in card.card_group" :card="v" :key="'c'+k"></card>
  </div>

</template>
<script>

  export default {
    data() {
      return {};
    },
    name: "card7",
    props: ['card'],
    components: {
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .card7{
  }
  .swiper-slide {
    position: relative;
  }
</style>
