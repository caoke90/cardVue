<template>
  <div :style="style" :mid="_uid">
    <box v-if="Array.isArray(card.card_group)" :card="card"></box>
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
    computed:{
      style:function () {
        var card=this.card;
        if(card.isPandent){
          return card.style;
        }else{
          return {};
        }
      }
    }
  };

</script>
