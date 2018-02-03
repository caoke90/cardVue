<template>
  <div class="card card9 m-panel" v-if="card">
    <div class="card-wrap">
      <div class="card-main">
        <weibo-title :card="card"></weibo-title>
        <weibo-article :card="card"></weibo-article>
        <weibo-footer :card="card"></weibo-footer>
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

    .card-wrap{
      padding-top: 0.3rem;
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
