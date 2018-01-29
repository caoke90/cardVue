<template>
  <div class="card m-panel card2" :class="['m-col-'+card.col]">
    <div class="card-wrap">
      <div class="card-main">
        <h2 class="card-title" v-if="card.title">
          {{card.title}}
        </h2>
        <div class="m-auto-list">
          <div class="m-auto-box" v-for="item in card.items">
            <div class="m-img-box m-imghold-square">
              <mv-img :needlazy="true" :src="item.pic"></mv-img>
            </div>
            <div class="m-text-box">
              <h3 class="m-text-cut">{{item.desc1}}</h3>
              <h4 class="m-text-cut">{{item.desc2}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    name: "card2",
    props: ['card'],
    components: {
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >
  .card2 .card-title {
    padding-top: 0.2rem;
    margin: 0 0.24rem;
    font-size: 0.28rem;
    color: #333; }

  .card2 .m-auto-list {
    margin-left: -0.04rem;
    margin-right: -0.04rem;
    margin-bottom: -0.2rem;
    padding: 0.2rem 0.24rem; }

  .card2 .m-auto-box {
    padding-left: 0.04rem;
    padding-right: 0.04rem;
    margin-bottom: 0.2rem; }

  .card2 .m-auto-list {
    position: relative; }

  .card2 .card-icon {
    position: absolute;
    z-index: 9;
    width: 0.72rem;
    height: 0.72rem;
    top: 0;
    left: 0; }
  .card2 .card-icon img {
    width: 100%;
    height: 100%; }

  .card2 .m-auto-box .m-text-box {
    text-align: center; }
  .card2 .m-auto-box .m-text-box h3 {
    font-size: 0.26rem;
    margin: 0.2rem 0 0 0; }
  .card2 .m-auto-box .m-text-box h4 {
    font-size: 0.24rem;
    color: #939393;
    margin: 0.12rem 0 0 0;
    line-height: normal; }


</style>
