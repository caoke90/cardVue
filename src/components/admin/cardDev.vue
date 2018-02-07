<template>
  <div v-if="page_type" :cid="this._uid" :key="card.cardId" @click.stop="editCard(card)" :class="{'editting':editting}" @mouseover.stop="mouseover($event)" @mouseleave="mouseleave">
    <div class="main-wrap" :class="{'active':editting}">
      <div @click.stop="delCard(card)" class="item del" style="">X</div>
      <div @click.stop="upCard(card)" class="item up" title="可按键盘↑操作">↑</div>
      <div @click.stop="downCard(card)" class="item down" title="可按键盘↓操作">↓</div>
    </div>
    <div v-if="helpJSON[page_type].demo_url" class="card">
       <img :src="helpJSON[page_type].demo_url" width="100%" onclick="return false;" />
    </div>
    <component v-else :is="page_type" :card="card" ></component>
  </div>

</template>

<script>
  const helpJSON=require("./cardshelp")
  import Bus from '../../marvel/bus';


  export default{
    data:()=>{
      return {
        helpJSON:helpJSON
      }
    },
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
          this.editCard(card)
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
    props:['card','contain'],
    computed: {
      editting:function () {

        if(this.card===Bus.root.editCardData){
          var scroolTop=document.querySelector("#mainEdit").scrollTop;

          setTimeout(()=>{
            document.querySelector("#mainEdit").scrollTop=scroolTop;
            var rect=this.$el.getBoundingClientRect()
            var mainEdit=document.querySelector("#mainEdit")
            var mainEditrect=mainEdit.getBoundingClientRect()
            if(rect.top+rect.height-mainEditrect.height>0){
              mainEdit.scrollTop=mainEdit.scrollTop+rect.top+rect.height-mainEditrect.height+rect.height;
            }else if(rect.top<0){
              mainEdit.scrollTop=mainEdit.scrollTop+rect.top-rect.height
            }
          },0)
          return true;
        }else{
          return false;
        }
      },
      page_type: function () {
        let type = '';
        if (this.card && this.card.card_type) {
          type="card"+(""+this.card.card_type).replace(/\D+/g,"");
        }
        return type;
      }
    }
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>

  .editting{
    border: 1px solid #ef4f4f;
    box-shadow: 2px 2px 5px #333333;
  }
  .main-wrap{
    left: 102%;
    width: 70px;
    display: block;
    height: 0;position: relative;z-index: 2;opacity: 0.1;
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
    }
    .drag{
      width:auto;
      height: 28px;
      line-height: 22px;
      padding: 1px 7px 2px;
      display: inline-block;
      font-size: 14px;
      background: #26a2ff;
      border-radius: 4px;
      text-align: center;
    }
    .del{
      /*position:absolute;*/
      /*left:46px;top: 0px;*/
      left: 10px;
      background: #ef4f4f;

    }
    .up{
      left: 10px;
    }
    .down{
      left: 10px;
    }

  }
  .m-active{
    border: 1px solid #26a2ff;
  }
  /*.m-active .main-wrap{*/
    /*opacity: 0.9;*/
  /*}*/
  .main-wrap.active{
    z-index: 1000;
    opacity: 0.9;
  }
</style>
