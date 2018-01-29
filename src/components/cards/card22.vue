<template>
  <div class="card m-panel card22">
    <a href="javascript:;">
      <div class="card-wrap">
        <div class="card-main" @click="openUrl(card.scheme)">
          <div class="m-box">
            <div class="box-left m-box-col m-box-center-a">
              <span class="m-img-icon"><mv-img :needlazy="true" :src="card.pic"></mv-img></span><span class="main-link m-box m-box-center-a"><span class="main-text m-text-cut" v-text="card.desc"></span></span>
            </div>
            <div v-if="card.scheme" class="box-right m-box-center-a"><i class="m-font m-font-arrow-right"></i></div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
  import Bus from '../../marvel/bus';
  export default {
    data() {
      return {};
    },
    name: "card22",
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
  .m-img-icon {
    margin-right: 0.2rem;
    width: 0.48rem;
    height: 0.48rem;
    font-size: 0;
  }
  .m-img-icon img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  .card22 .card-wrap {
    height: 0.88rem; }
  .card22 .card-wrap .card-main {
    margin: 0; }

  .card22 .m-img-icon {
    -ms-flex-negative: 0;
    flex-shrink: 0; }

  .card22 .box-left {
    font-size: 0;
    min-width: 0; }
  .card22 .box-left .main-link {
    font-size: 0.32rem;
    color: #333;
    min-width: 0; }
  .card22 .box-left .main-link .main-text {
    min-width: 0;
    display: block;
    /*处理低版本安卓4.x不截字的问题*/
    max-width: 3.2rem;
    max-width: 100vw; }
  .card22 .box-left .main-link .sub-text {
    font-size: 0.24rem;
    color: #939393;
    margin-left: 0.8rem;
    -ms-flex-negative: 0;
    flex-shrink: 0; }

</style>
