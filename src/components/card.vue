<template>

  <component v-if="page_type=='weibo'" :is="page_type" :item="card" :cid="this._uid"></component>
  <component v-else :is="page_type" :card="card" :cid="this._uid"></component>

</template>

<script>

  const component = require.context('./cards', false, /\.vue$/);

  const requireAll = context => context.keys().map(context);
  const compo={
    "weibo":require("./weibo/weibo.vue")
  }
  requireAll(component).forEach((card) => {
    const name = (card.name || /(\S+\/)(\S+)\.vue/.exec(card.hotID)[2]).toLowerCase();
    compo[name]=card;
  });
  export default{
    props:['card'],
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
