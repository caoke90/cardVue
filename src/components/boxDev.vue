<template>
  <div :bid="this._uid" style="min-height: 2em;">
    <slot name="drag1"></slot>
    <div v-if="contain!='children'" style="left: -52px;height: 0;position: relative;z-index: 2;opacity: 0.9" slot="drag1">
      <mt-button cardType="box" style="cursor:pointer" type="danger" size="small">box</mt-button>
    </div>
    <!--在中间显示的样子-->
    <div v-if="helpItem&&helpItem.demo_url" style="max-height: 100px;overflow: scroll;">
      <img :src="helpItem.demo_url"/>
    </div>
    <component v-else :is="page_type" :card="card" :helpItem="helpItem" ></component>
  </div>
</template>

<script>
  const helpJSON=require("./helpJSON")
  const component = require.context('./boxs', false, /\.vue$/);

  const requireAll = context => context.keys().map(context);
  const compo={}
  requireAll(component).forEach((item) => {
    const name = (item.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]).toLowerCase();
    compo[name]=item;
  });
  export default{
    data:()=>{
      return {
        helpItem:null
      }
    },
    props:['card','contain'],
    components:compo,
    computed: {
      page_type: function () {
        let type = 'box';

        if (this.card && this.card.card_type) {
          type="card"+(""+this.card.card_type).replace(/\D+/g,"");
          this.helpItem=helpJSON[type]
        }
        return type;
      }
    }
  };

</script>
