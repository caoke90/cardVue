<template>
  <div draggable="true" :cid="this._uid">
    <slot name="drag1"></slot>
    <div v-if="contain!='children'" style="left: 100%;height: 0;position: relative;z-index: 2;">
      <mt-button cardType="card" style="cursor:pointer" type="primary" size="small">card</mt-button>
    </div>

    <component v-if="page_type=='weibo'" :is="page_type" :item="card"></component>
    <component v-else :is="page_type" :card="card" ></component>
  </div>

</template>

<script>

  const component = require.context('./cards', false, /\.vue$/);

  const requireAll = context => context.keys().map(context);
  const compo={
    "weibo":require("./weibo/weibo.vue")
  };
  requireAll(component).forEach((card) => {
    const name = (card.name || /(\S+\/)(\S+)\.vue/.exec(card.hotID)[2]).toLowerCase();
    compo[name]=card;
  });
  export default{
    props:['card','contain'],
    components:compo,
    computed: {
      page_type: function () {
        let type = 'card1';
        if (this.card && this.card.card_type) {
          if(typeof this.card.card_type=="string"){
            type=this.card.card_type;
          }else{
            type="card"+this.card.card_type;
          }
        }
        return type;
      }
    }
  };

</script>
