<template>
  <article @click="jump_url" class="ar-img-box">
    <div class="article-top">

      <div class="top1">
        <mv-img :needlazy="true" :src="card.object.author.avatar_large"></mv-img>
        <span>{{card.object.author.display_name}}</span>
      </div>
      <div class="top2">
        <mv-img :needlazy="true" :src="img"></mv-img>
        <span>️文章</span>
      </div>
    </div>
    <mv-img :needlazy="true" class="imgcon" :src="card.object.image.url"></mv-img>
    <div class="article-bottom">
        <h3 v-html="card.object.summary"></h3>
    </div>
  </article>
</template>
<style scoped lang="scss">
  .ar-img-box{
    position: relative;
    overflow: hidden;
    height: 3.5rem;
    img{
      width: 100%;
      height: 100%;
    }
    .article-top {
      background-image: linear-gradient(-180deg, rgba(0,0,0,0.30) 1%, rgba(0,0,0,0) 97%);
      position: absolute;
      width: 100%;
      height: 0.64rem;
      line-height: 0.64rem;
      padding: 0 0.2rem;
      img {
        width: 0.36rem;
        height: 0.36rem;
        vertical-align: -15%;
        border-radius: 50%;
      }
      .top1 {
        float: left;
        margin-left: 0.1rem;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.50);
        color: rgba(255, 255, 255, 0.90);
        font-size: 0.24rem;
      }
      .top2 {
        text-shadow: 0 0 0.04rem rgba(0, 0, 0, 0.50);
        color: rgba(255, 255, 255, 0.90);
        font-size:0.24rem;
        transform: scale(0.8);
        float: right;
        img{
          vertical-align: -15%;
          width: 0.24rem;
          transform: scale(0.8);
          margin-right: 0;
        }
      }
    }
    .article-bottom {
     	width: 100%;
      background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.50) 98%);
      position: absolute;
      padding: 0.24rem;
      padding-top:0.44rem;
      bottom: 0;
      left: 0;

      font-size: 0.32rem;
      color: #FFFFFF;
      letter-spacing: -0.05px;

      text-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.75);
      h3{
        font-size: 0.32rem;
      }
    }
  }
</style>
<script>
  import imgs from "@/assets/img/icon_article.png";
  import Bus from '../../marvel/bus';
  export default {
    props: ['card', 'hidImg'],
    data() {
      return {
        img:imgs
      };
    },
    computed: {
      type_icon: function() {
        // 根据card.type值判断显示图标
        if(this.card.type === 'article') {
          return 'a-art';
        }
        if(this.card.type === 'wenda') {
          return 'a-ask';
        }
        return null;
      },
    },
    methods: {
      jump_url() {
        if(this.card && this.card.url) {
          Bus.$emit("openScheme",this.card.url)

        }
      },
    }
  };
</script>

