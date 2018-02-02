<template>
  <component :is="page_type" :card="card" :bid="this._uid"></component>
</template>

<script>

  const component = require.context('./boxs', false, /\.vue$/);

  const requireAll = context => context.keys().map(context);
  const compo={}
  requireAll(component).forEach((item) => {
    const name = (item.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]).toLowerCase();
    compo[name]=item;
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
