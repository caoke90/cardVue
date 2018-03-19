<template>
  <div :style="style">
    <box v-if="card.type=='ui'||card.type=='box'||card.type=='page'" :mid="_uid" :card="card" :contain="contain"></box>
    <card v-else :mid="_uid" :card="card" :contain="contain"></card>
  </div>

</template>

<script>
  import Bus from '../../marvel/bus';
  export default{
    props:['card','contain','index'],
    data:function () {
      return {
        position:""
      }
    },
    components: {
      'box': require('./boxDev.vue')
    },
    computed:{
      style:function () {
        var card=this.card;
        if(card.style){
          if(card.style.position=='fixed'&&window.innerWidth>375){
            if(!Bus.rect){
              Bus.rect=this.$parent.$refs.center.getBoundingClientRect();
            }

            var rect=Bus.rect;
            console.log(rect)
            var left=rect.x;
            var right=window.innerWidth-(rect.x+rect.width);

            var style=JSON.parse(JSON.stringify(card.style))
            if(style.left&&style.left.indexOf("rem")>-1){
              style.left=(left/50+parseFloat(style.left))+"rem";
            }
            if(style.right&&style.right.indexOf("rem")>-1){
              style.right=(right/50+parseFloat(style.right))+"rem";
            }
            if(style.top){

              style.top=(rect.y/50+parseFloat(style.top))+"rem";
            }
            return style;
          }
        }

        return card.style;
      }
    },
    methods: {

    }
  };

</script>
