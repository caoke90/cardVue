<template>
  <div :style="card.style" onclick="return false;" >
    <box v-if="card.type=='ui'||card.type=='box'||card.card_group" :mid="_uid" :card="card" :contain="contain"></box>
    <card v-else :mid="_uid" :card="card" :contain="contain"></card>
  </div>

</template>

<script>
  var $ = require('jquery');
  import Bus from '../marvel/bus';
  export default{
    props:['card','contain','index'],
    data:function () {
      return {}
    },
    components: {
      'box': require('./boxDev.vue')
    },
    computed:{},
    methods:{}
  };

</script>
