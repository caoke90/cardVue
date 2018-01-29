<template>
  <div style="margin:0 auto;max-width: 750px;position: relative;">
    <div v-for="(v,k) in mainChild" :key="k">
      <mod :card="v"></mod>
    </div>
  </div>
</template>

<script>
  import Bus from '../marvel/bus';
  require("../common/marvel.css");

  //获取url参数
  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }
  Bus.params={
    page_id:GetQueryString("page_id")||6225
  }

  const app={
    data:function () {
      return {
        mainChild:[]
      };
    },
    components: {
      'mod': require('../components/mod.vue')
    },
    mounted:function () {
      var the=this;
      var url;
      if(GetQueryString("preview")==1){
        url="/subject/h5/getpageInfo?page_id="+Bus.params.page_id+"&preview=1"
      }else{
        url="/subject/h5/getpageInfo?page_id="+Bus.params.page_id
      }
      this.$http.get(url).then(function (rst) {
        the.mainChild=rst.data.data.cards.map(function (item) {
          item.card_type="card"+item.card_type
          return item;
        });

      })
    }
  };

  export default app;
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss">

</style>
