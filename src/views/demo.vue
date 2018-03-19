<template>
  <div style="margin:0 auto;max-width: 750px;position: relative;">
    <div v-for="(v,k) in card_group" v-if="v.type=='page'" :key="k">
      <card :card="v"></card>
    </div>
    <div v-for="(v,k) in card_group" v-if="v.type=='ui'" :key="k">
      <card :card="v"></card>
    </div>
    <mv-loadmore :top-method="pull_refresh">
      <div v-for="(v,k) in card_group" v-if="v.type=='box'" :key="k">
        <card :card="v"></card>
      </div>
    </mv-loadmore>

  </div>
</template>

<script>
  import Bus from '../marvel/bus';
  require("../common/marvel.css");


  const app={
    data:function () {
      return {
        is_request: false,
        card_group:[]
      };
    },
    components: {
      'mv-loadmore': require('@/marvel/components/loadmore.vue'),
    },
    methods:{
      pull_refresh:function() {
        // 目前无法准确判断下拉刷新断层问题,暂时先清掉数据,后续持续优化
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.init_first_data();
      },
      init_first_data:function(){
        if (this.is_request === true) {
          return;
        }
        var self=this;
        var url="/subject/h5/getpageInfo"+window.location.search;

        this.$http.get(url).then(function (rst) {
          self.is_request=false;
          self.card_group=rst.data.data.cards;
          self.$nextTick(function () {
            Bus.$emit('mvLoadEnd');
          });
        }, function () {
          Bus.$emit('mvLoadEnd');
        })
      }
    },
    mounted:function () {
      this.init_first_data()
    }
  };

  export default app;
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss">

</style>
