<template>
  <div :style="card.style" :mid="_uid">
    <box v-if="card.type=='ui'||card.type=='box'||card.card_group" :card="card"></box>
    <card v-else :card="card"></card>
  </div>
</template>

<script>
  import Bus from '../marvel/bus';

  export default{
    props:['card'],
    components: {
      'box': require('./box.vue')
    },

    data:function () {
      return {}
    },

  };

</script>
