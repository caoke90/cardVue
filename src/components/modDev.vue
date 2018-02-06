<template>
  <div :style="style"  >
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
      edit: function () {
        var e = Bus.hoverE;
        //触发编辑操作
        if (this.contain == "mainChild") {
          var mid = $(e.target).parents("[mid]").attr("mid")
          if (mid) {
            var cid = $(e.target).parents("[cid]").attr("cid")
            if (cid) {
              Bus.editCardData = this.findVue(cid, this).card;
              Bus.$emit("edit")
            } else {
              Bus.editCardData = this.findVue($(e.target).parents("[mid]").attr("mid"), this).card;
              Bus.$emit("edit")
            }
          }
        }
      },
      mouseover: function (e) {
        Bus.hoverE = e;
        clearTimeout(this.inte)
        this.hover = true
        e.stopPropagation()


      },
    }
  };

</script>
