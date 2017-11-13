<template>
  <div draggable="true" :bid="this._uid">
    <slot name="drag1"></slot>
    <div v-if="contain!='children'" style="left: -52px;height: 0;position: relative;z-index: 2;opacity: 0.9" slot="drag1">
      <mt-button cardType="box" style="cursor:pointer" type="danger" size="small">box</mt-button>
    </div>
    <!--在左边显示的样子,开屏动画-->
    <div v-if="card.card_type=='screenimg'&&contain=='children'">

    </div>
    <div v-else-if="card.card_type=='screendialog'&&contain=='children'">

    </div>
    <component v-else :is="page_type" :card="card" ></component>
  </div>
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
    props:['card','contain'],
    components:compo,
    computed: {
      page_type: function () {
        let type = 'box1';

        if (this.card && this.card.card_type) {
          if(typeof this.card.card_type=="string"){
            type=this.card.card_type;
          }else{
            type="box"+this.card.card_type;
          }

        }
        return type;
      }
    }
  };

</script>
