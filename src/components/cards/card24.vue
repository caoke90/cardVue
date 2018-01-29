<template>
  <div class="card m-panel card24">
    <div class="card-wrap">
      <div class="card-main">
        <header v-if="card.title"><h2 v-text="card.title"></h2></header>
        <article v-text="card.desc" @click="openUrl(card.scheme)"></article>
        <footer v-if="card.source">
          来源：{{card.source}}
        </footer>
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
    name: "card24",
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
  .card24 .card-wrap .card-main {
    margin: 0;
    padding-bottom: 0.28rem; }

  .card24 header {
    height: 0.8rem;
    line-height: 0.8rem;
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid; }


  .card24 header h2 {
    font-size: 0.34rem;
    color: #333; }

  .card24 article {
    color: #333;
    font-size: 0.3rem;
    line-height: 0.4rem;
    padding: 0.28rem 0 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; }
  .card24 article .card-more {
    color: #507DAF; }
  .card24 article .card-more:before {
    content: "…";
    color: #333; }

  .card24 footer {
    margin-top: 0.2rem;
    color: #939393;
    font-size: 0.24rem; }
</style>
