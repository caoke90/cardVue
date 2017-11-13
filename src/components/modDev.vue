<template>
  <div :style="style" @mouseover="mouseover" @mouseleave="mouseleave">

    <box v-if="Array.isArray(card.card_group)" :mid="_uid" :card="card" :contain="contain">
      <div v-if="contain=='children'" style="left:0;background:#ddd;position: relative;z-index: 2;font-size: 12px;" slot="drag1">
        <mt-button style="cursor:pointer;opacity: 0.5" type="danger" size="small">box</mt-button>
        <span>{{card.help}}</span>
      </div>
    </box>
    <card v-else :mid="_uid" :card="card" :contain="contain">
      <div v-if="contain=='children'" style="left: 0;background:#ddd;position: relative;z-index: 2;" slot="drag1">
        <mt-button style="cursor:pointer;opacity: 0.5" type="primary" size="small">card</mt-button>
        <span>{{card.help}}</span>
      </div>

    </card>
  </div>

</template>

<script>
  var $ = require('jquery');
  import Bus from '../marvel/bus';
  export default{
    props:['card','contain'],
    data:function () {
      return {
        hover:false
      }
    },
    components: {
      'box': require('./boxDev.vue')
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
    },
    methods:{
      edit:function () {
        var e=Bus.hoverE;
        //触发编辑操作
        if(this.contain=="mainChild"){
          var mid=$(e.target).parents("[mid]").attr("mid")
          if(mid){
            var cid=$(e.target).parents("[cid]").attr("cid")
            if(cid){
              Bus.editCardData=this.findVue(cid,this).card;
              Bus.$emit("edit")
            }else{
              Bus.editCardData=this.findVue($(e.target).parents("[mid]").attr("mid"),this).card;
              Bus.$emit("edit")
            }
          }
        }
      },
      mouseover:function (e) {
        Bus.hoverE=e;
        clearTimeout(this.inte)
        this.hover=true
        e.stopPropagation()



      },
      mouseleave:function () {
        this.inte=setTimeout(()=>{
          this.hover=false
        },200)
      }
    }
  };

</script>
