<template>

  <component  :is="page_type" :card="card" :cid="this._uid"></component>

</template>

<script>

  const component = require.context('./cards', false, /\.vue$/);

  const requireAll = context => context.keys().map(context);
  const compo={
    "card9":require("./weibo/weibo.vue")
  }
  requireAll(component).forEach((card) => {
    const name = (card.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]).toLowerCase();
    compo[name]=card;
  });
  export default{
    props:['card'],
    components:compo,
    computed: {
      page_type: function () {
        let type = '';
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
