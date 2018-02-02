<template>
  <div class="card m-panel card28" :class="['m-col-'+card.col]">
    <div class="card-wrap">
      <div class="card-main">
        <div class="m-item-box" v-for="item in card.items" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)">
          <div class="m-diy-btn m-box-col m-box-center m-box-center-a" @click="openUrl(item.scheme)" v-if="item.pic">
            <mv-img :needlazy="true" :src="item.pic"></mv-img><h4 v-text="item.title_sub"></h4></div>
          <div class="m-diy-btn m-box-col m-box-center0 m-box-center-a" @click="openUrl(item.scheme)" v-else>
            <h4 class="m-text-cut" v-text="item.title_sub"></h4></div>
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
    name: "card28",
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

      openUrl:function (url) {
        if(url){
          Bus.$emit("openScheme",url);
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .card28 .card-wrap .card-main {
    margin-bottom: -1px;
    /* autoprefixer: off */
    display: flex;
    flex-wrap: wrap; }

  .card28 .m-item-box {
    /*调用itembox组件,参看sasscore*/
    height: auto;
    line-height: 1;
    text-align: center;
    padding: 0.2rem 0 0.2rem;
    min-height: 1.12rem;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center; }
  .card28 .m-item-box::before {
    top: 0.32rem;
    bottom: 0.32rem; }
  .card28 .m-item-box::after {
    left: 0.32rem;
    right: 0.32rem; }
  .card28 .m-item-box .m-diy-btn img {
    width: 0.72rem;
    height: 0.72rem; }
  .card28 .m-item-box .m-diy-btn h4 {
    font-size: 0.24rem;
    margin: 0.14rem 0 0 0; }
  .card28 .m-item-box .m-diy-btn {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    height: 100%; }
  .card28 .m-item-box .m-diy-btn h3 {
    font-size: 0.3rem;
    color: #333;
    margin-bottom: 0;
    font-weight: 700; }
  .card28 .m-item-box .m-diy-btn h3 + h4 {
    color: #939393; }

</style>
