<template>
  <div :bid="this._uid" style="min-height: 2em;">

    <div class="main-wrap" slot="drag1">
      <!--<div class="btn-wrap">-->
        <!--<button class="btn-item btn-up">↑</button>-->
        <!--<button class="btn-item btn-down">↓</button>-->
        <!--<button class="btn-item btn-drag">drag</button>-->
        <!--<button class="btn-item btn-remove">X</button>&lt;!&ndash;v-if&ndash;&gt;-->
      <!--</div>-->
      <mt-button cardType="box" style="cursor:pointer;" type="danger" size="small">编辑</mt-button>
      <div cardType="del" style="z-index:10;font-size:12px;cursor:pointer;position:absolute;left:-22px;top: 0px;text-align:center;line-height:20px;border-radius: 50%;display: block;width: 20px;height: 20px;background: #ef4f4f;color: #fff;">X</div>
    </div>
    <!--在中间显示的样子-->
    <component v-if="page_type=='card13'" :is="page_type" :card="card" :helpItem="helpItem"></component>
    <div v-else-if="helpItem&&helpItem.demo_url" style="max-height: 100px;overflow: scroll;margin-bottom: 0.18rem;">
      <img :src="helpItem.demo_url" onclick="return false;" />
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
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .main-wrap{
    left: -52px;height: 0;position: relative;z-index: 2;opacity: 0.9
  }
  .main-wrap .btn-wrap {
    width: 32px;
    height: 200px;
    position: absolute;
    top: 0;
    right: -32px;
  }
  .main-wrap .btn-up {
    top: 32px;
  }
  .main-wrap .btn-wrap{
    width: 32px;
    height: 200px;
    position: absolute;
    top: 0;
    right: -32px;
  }

  .main-wrap .btn-remove{
    right: 0;
  }
  .main-wrap .btn-up{
    top:32px;
  }
  .main-wrap .btn-down{
    top:64px;
  }
  .main-wrap .btn-drag{
    top:96px;
    cursor:move;
  }
  .main-wrap .btn-edit{
    right: 0;
  }
  .main-wrap .btn-item {
    outline: none;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 0;
    border: none;
    width: 30px;
    height: 30px;
    background: #E1E1E1;
    color: #fff;
    cursor: pointer;
  }
</style>
