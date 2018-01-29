<template>
  <div :cid="this._uid" :key="card.cardId">
    <slot name="drag1"></slot>
    <div v-if="contain!='children'" style="left: 100%;height: 0;position: relative;z-index: 2;">
      <mt-button cardType="card" style="cursor:pointer;" type="primary" size="small">编辑</mt-button>
        <div cardType="del" style="z-index:10;font-size:12px;cursor:pointer;position:absolute;left:57px;top: 0px;text-align:center;line-height:20px;border-radius: 50%;display: block;width: 20px;height: 20px;background: #ef4f4f;color: #fff;">X</div>

    </div>
    <!--在中间显示的样子-->
    <div v-if="helpJSON[page_type].demo_url" class="card">
       <img :src="helpJSON[page_type].demo_url" width="100%" onclick="return false;" />
    </div>
    <component v-else :is="page_type" :card="card" ></component>
  </div>

</template>

<script>
  const helpJSON=require("./helpJSON")
  const component = require.context('./cards', false, /\.vue$/);

  const requireAll = context => context.keys().map(context);
  const compo={

  };
  requireAll(component).forEach((card) => {
    const name = (card.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]).toLowerCase();
    if(!compo[name]){
      compo[name]=card;
    }
  });

  export default{
    data:()=>{
      return {
        helpJSON:helpJSON
      }
    },
    methods:{

    },
    props:['card','contain'],
    components:compo,
    computed: {
      page_type: function () {
        let type = 'card1';
        if (this.card && this.card.card_type) {
          type="card"+(""+this.card.card_type).replace(/\D+/g,"");

        }
        return type;
      }
    }
  };

</script>
