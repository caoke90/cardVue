<template>
  <div :style="style"  >
    <box v-if="card.type=='ui'||card.type=='box'||card.card_group" :mid="_uid" :card="card" :contain="contain"></box>
    <card v-else :mid="_uid" :card="card" :contain="contain"></card>
  </div>

</template>

<script>
  import Bus from '../../marvel/bus';
  export default{
    props:['card','contain','index'],
    data:function () {
      return {}
    },
    components: {
      'box': require('./boxDev.vue')
    },
    computed:{
      style:function () {
        var card=this.card;
        if(card.style){
          var style=JSON.parse(JSON.stringify(card.style))
          style.position="absolute";
          return style
        }else{
          return {}
        }
      }
    },
    methods: {

    }
  };

</script>
