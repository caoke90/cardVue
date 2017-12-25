<template>
  <div class="card card3 m-col-4">
    <div class="card-wrap">
      <div class="card-main">
        <h2 class="card-title">
          {{card.cardData.title}}
        </h2>
        <div class="m-auto-list">
          <card v-for="(v,k) in card.card_group" :card="v" :key="'c'+k"></card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    name:"card14",
    props:['card']
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .card {
    margin-bottom: 0.5625rem; }
  .card .card-wrap {
    margin-left: 0.75rem;
    margin-right: 0.75rem;
    height: 100%; }
  .card .card-wrap .card-main {
    box-sizing: border-box;
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    height: 100%; }
  .card .card-wrap .card-main > .m-box {
    height: 100%; }
  .card .box-right .m-font-arrow-right {
    font-size: 0.875rem;
    width: 0.625rem;
    color: #939393; }

  .m-auto-list {
    overflow: hidden;
    font-size: 0; }

  .m-auto-box {
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box; }

  .m-col-4 .m-auto-box{
    width: 25%;
  }
  .m-img-box img {
    width: 100%;
    height: 100%;
    vertical-align: top;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .card3 .card-title {
    padding-top: 0.625rem;
    margin: 0 0.75rem;
    font-size: 0.875rem;
    color: #333; }

  .card3 .m-auto-list {
    margin-left: -0.125rem;
    margin-right: -0.125rem;
    margin-bottom: -0.625rem;
    padding: 0.625rem 0.75rem; }

  .card3 .m-auto-box {
    padding-left: 0.125rem;
    padding-right: 0.125rem;
    margin-bottom: 0.625rem; }

  .card3 .m-auto-list {
    position: relative; }

  .card3 .card-icon {
    position: absolute;
    z-index: 9;
    width: 2.25rem;
    height: 2.25rem;
    top: 0;
    left: 0; }
  .card3 .card-icon img {
    width: 100%;
    height: 100%; }

  .card3 .m-auto-box .m-text-box {
    text-align: center; }
  .card3 .m-auto-box .m-text-box h3 {
    font-size: 0.8125rem;
    margin: 0.625rem 0 0 0; }
  .card3 .m-auto-box .m-text-box h4 {
    font-size: 0.75rem;
    color: #939393;
    margin: 0.375rem 0 0 0;
    line-height: normal; }

  .card3.card-more .m-auto-box:nth-of-type(4) .m-img-box {
    position: relative; }
  .card3.card-more .m-auto-box:nth-of-type(4) .m-img-box::before {
    font-family: "marvelfont";
    content: "\E000";
    font-size: 2rem;
    color: #c8c8c8;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 99; }
  .card3.card-more .m-auto-box:nth-of-type(4) .m-img-box::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); }
</style>
