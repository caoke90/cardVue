<template>
  <div class="emptyBox">
    <card v-for="(v,k) in card.card_group" :card="v" :key="'c'+k"></card>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    name: "card10",
    props: ['card'],
    components: {
    },
    methods: {

    },
  };
</script>
