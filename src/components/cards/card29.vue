<template>
  <div class="card m-panel card29">
      <div class="card-wrap" @click="openUrl(card.scheme)">
        <div class="card-main">
          <div class="m-box">
            <div class="box-left m-box-col m-box-center-a">
              <span class="m-img-icon" v-if="card.pic"><mv-img :needlazy="true" :src="card.pic"></mv-img></span>
              <span class="link-text"><span class="main-link" v-text="card.desc"></span></span>
            </div>
            <div class="box-right m-box-center-a"><span class="sub-link" v-text="card.title_extra_text"></span><i class="m-font m-font-arrow-right" v-if="card.scheme"></i></div>
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
    name: "card29",
    props: ['card'],
    components: {
    },
    methods: {
      openUrl:function (url) {
        if(url){
          Bus.$emit("openScheme",url);
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .card29 {
    position: relative; }
  .card29::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.06rem;
    background-color: #FF8200; }
  .card29 .card-wrap {
    height: 0.72rem; }
  .card29 .card-wrap .card-main {
    margin: 0; }
  .card29 .box-left {
    font-size: 0; }
  .card29 .box-left .main-link {
    color: #636363;
    font-size: 0.28rem; }
  .card29 .box-right .sub-link {
    font-size: 0.24rem;
    color: #939393;
    margin-right: 0.16rem;
    max-width:1.6rem; }
  .card29 .box-right .m-font-arrow-right {
    width: 0.24rem;
    height: 0.24rem;
    line-height: 0.24rem;
    text-align: center;
    background-color: #FF8200;
    border-radius: 0.04rem;
    color: #FFF;
    font-size: 0.16rem;
    font-weight: 700; }

</style>
