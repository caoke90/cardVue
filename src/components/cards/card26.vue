<template>
  <div class="card m-panel card26" :class="['m-col-'+card.col]">
    <div class="card-wrap">
      <div class="card-main">
        <div class="m-item-box" v-for="button in card.items" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)">
          <div class="m-diy-btn m-box-col m-box-center0 m-box-center-a" @click="openUrl(button.scheme)" v-if="button.pic">
            <mv-img :needlazy="true" :src="button.pic"></mv-img><h4 v-text="button.title_sub"></h4></div>
          <div class="m-diy-btn m-box-col m-box-center0 m-box-center-a" @click="openUrl(button.scheme)" v-else>
            <h4 class="m-text-cut" v-text="button.title_sub"></h4></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '../../marvel/bus';
  export default {
    data() {
      return {};
    },
    name: "card26",
    props: ['card'],
    components: {
    },
    methods: {
      touchstart:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive=e.currentTarget;
        Bus.mActive.classList.add("m-active")

      },
      touchmove:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
          Bus.mActive=null
        }
      },
      addFollow:function (button) {
        button.sub_type=1;
        this.$http.post(button.params.callback_url).then(function (resp) {
          if(resp.data&&resp.data.status==1){
          }else{
            button.sub_type=0;
          }
        },function () {
          button.sub_type=0;
        })
      },
      openUrl:function (url) {
        if(url){
          Bus.$emit("openScheme",url);
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .card26 .card-wrap .card-main {
    margin-bottom: -1px; }

  .card26 .m-item-box {
    /*调用itembox组件,参看sasscore*/
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    padding: 0 0.16rem 0 0.24rem; }
  .card26 .m-item-box::before {
    top: 0.16rem;
    bottom: 0.16rem; }
  .card26 .m-item-box::after {
    left: 0.16rem;
    right: 0.16rem; }
  .card26 .m-item-box .m-diy-btn img {
    width: 0.48rem;
    height: 0.48rem; }
  .card26 .m-item-box .m-diy-btn h4 {
    font-size: 0.32rem;
    margin: 0 0 0 0.32rem; }
  .card26 .m-item-box .m-diy-btn h4.m-text-cut{margin-left:0.08rem}
</style>
