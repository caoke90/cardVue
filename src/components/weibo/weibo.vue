<template>
  <div class="card card9" v-if="card">
    <div class="card-wrap">
      <div class="card-main">
        <weibo-title :card="card" v-if="card.card_type=='homepage_review'"></weibo-title>
        <weibo-header v-else :card="card" ></weibo-header>

        <weibo-article :card=card></weibo-article>
        <weibo-footer :card=card></weibo-footer>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    name:"card9",
    data() {
      return {};
    },
    props: ['card'],
    components: {
      weiboTitle: require('./weibo-title.vue'),
      weiboHeader: require('./weibo-header.vue'),
      weiboArticle: require('./weibo-article.vue'),
      weiboFooter: require('./weibo-footer.vue'),

    }
  };
</script>
<style lang="scss">
  .m-active{
    background-color: #e6e6e6 !important;
    position: relative; z-index: 2;
  }
  .card9{
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid;
    background: #fff;
    margin-bottom: 0.18rem;
    /*overflow: hidden;*/
    height: 100%;
    line-height: 1.5;
    .card-wrap{
      padding-top: 0.3rem;
      margin-left: 0.24rem;
      margin-right: 0.24rem;
      .card-main{
        margin-left: -0.24rem;
        margin-right: -0.24rem;
      }
    }
  }
  .weibo-text{
    line-height: 1.5;
    word-wrap: break-word;
    .url-icon{
      position: relative;
      top: 0.06rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.04rem;
      img{
        width:0.34rem;
        height: 0.34rem;
      }
    }
  }
</style>
