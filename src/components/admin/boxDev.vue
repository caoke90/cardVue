<template>
  <div :bid="this._uid"  @click.stop.prevent="editCard(card)" :style="{height:card.height}" style="min-height: 1em;" class="boxDev" :class="{'editting':editting}" @mouseover="mouseover($event)" @mouseleave="mouseleave">

    <div class="main-wrap" :class="{'active':editting2||editting}">
      <div @click.stop="editCard(card)" class="item drag" style="">drag</div>
      <div @click.stop="delCard(card)"  v-show="editting" class="item del">X</div>
      <div @click.stop="upCard(card)" v-if="card.type=='box'" class="item up" title="可按键盘↑操作">↑</div>
      <div @click.stop="downCard(card)" v-if="card.type=='box'" class="item down" title="可按键盘↓操作">↓</div>
    </div>
    <!--在中间显示的样子-->
    <component v-if="page_type=='card13'" :is="page_type" :card="card" ></component>
    <div @click.stop="editCard(card)" v-else-if="helpItem&&helpItem.demo_url" style="max-height: 100px;overflow: scroll;margin-bottom: 0.18rem;">
      <img :src="helpItem.demo_url" onclick="return false;" />
    </div>
    <component v-else :is="page_type" :card="card" :helpItem="helpItem" ></component>
  </div>
</template>

<script>
  const helpJSON=require("../cardshelp")
  import Bus from '../../marvel/bus';

  export default{
    data:()=>{
      return {
        helpItem:null
      }
    },
    props:['card','contain'],
    methods:{
      mouseover:function (e) {
        this.top=e.currentTarget.getBoundingClientRect().top;
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive=e.currentTarget;
        Bus.mActive.classList.add("m-active")

      },
      mouseleave:function () {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
          Bus.mActive=null
        }
      },
      delCard:function (card) {
        if(!this.editting){
          return;
        }
        Bus.delCard(card)
      },
      upCard:function (card) {
        if(!this.editting){
          this.editCard(card)
          return;
        }
        Bus.upCard(card)
      },
      downCard:function (card) {
        if(!this.editting){
          this.editCard(card)
          return;
        }
        Bus.downCard(card)
      },
      editCard:function (card) {
        Bus.editCard(card)

      }
    },
    computed: {
      editting:function () {
        return this.card===Bus.root.editCardData
      },
      editting2:function () {
        if(this.card.card_group&&this.card.card_group.indexOf(Bus.root.editCardData)>-1){
          return true;
        }else{
          return false;
        }

      },
      page_type: function () {
        let type = '';

        if (this.card && this.card.card_type) {
          type="card"+(""+this.card.card_type).replace(/\D+/g,"");
          this.helpItem=helpJSON[type]
        }
        return type;
      }
    }
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .boxnone{
    height: 0;
  }
  .boxDev{
    border: 1px solid hsla(0,0,0,0);
    box-sizing: border-box;
  }
  .editting{
    border: 1px solid #ef4f4f;
    box-sizing: border-box;
    .item{
      opacity: 1;
    }
  }
  .main-wrap{
    left: -70px;height: 0;position: relative;z-index: 2;
    width: 0;
    background: #fff;
    display: block;
    opacity: 0.1;
    .item{
      z-index:10;
      font-size:12px;
      cursor:pointer;
      text-align:center;
      line-height:20px;
      border-radius: 50%;
      display: block;
      width: 20px;
      height: 20px;
      color: #fff;
      margin-bottom: 6px;
      background: #999;
      position:relative;
      left:22px;
    }
    .drag{
      width:auto;
      height: 28px;
      line-height: 22px;
      padding: 1px 7px 2px;
      display: inline-block;
      font-size: 14px;
      background: #ef4f4f;
      border-radius: 4px;
      text-align: center;
    }
    .del{
      position:absolute;
      left:0px;top: 0px;
      background: #ef4f4f;

    }
    .up{
      left: 32px;
    }
    .down{
      left: 32px;
    }

  }
  .m-active{
    border: 1px solid #26a2ff;
    box-sizing: border-box;
  }
  /*.m-active .main-wrap{*/
    /*opacity: 0.9;*/
  /*}*/
  .main-wrap.active{
    box-sizing: border-box;
    z-index: 1000;
    opacity: 0.9;
  }

</style>
