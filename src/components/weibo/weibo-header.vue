<template>
  <header class="weibo-title">
    <a @click="jump_url" class="m-img-box">
      <mv-img :needlazy="true" :src="card.user.profile_image_url"></mv-img>
      <i class="m-icon" :class='"m-icon-"+card.user.verified_color+"v"' v-if="card.user.verified_color"></i>
    </a>
    <div class="m-box-col">
      <div class="m-text-box">
        <a @click="jump_url">
          <h3 class="m-text-cut">
            {{card.user.name}}
            <weibo-icon :user="card.user"></weibo-icon>
          </h3>
        </a>
        <h4 class="m-text-cut">
          <span class="time">{{card.created_at*1000 | fromNow}}</span>
          <span class="from" v-if="card.source" v-html="' 来自 ' + card.source"></span>
        </h4>
      </div>
    </div>

  </header>
</template>
<style lang="scss">
	@import "../../scss/_sassCore";
  @import "../../scss/_var";
  .weibo-title {
    padding: 0 0.24rem;
    overflow: hidden;
    //左边定宽，右边自适应
    .m-img-box{
      float:left;
      margin-right:-0.8rem;

      position: relative;

      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      img{
        border-radius: 50%;
        width: 100%;
        height: 100%;
        vertical-align: top;
        object-fit: cover;
      }
      .m-icon{
        font-size: 0.28rem;
        position: absolute;
        z-index: 3;
        right: -1px;
        bottom: -1px;
      }
    }

    .m-box-col{
      float:right;width:100%;

      .m-text-box{
        font-size: 0.32rem;
        margin-left:1.06rem;
        .m-text-cut{
          font-size: 0.3rem;
        }
        .time{
          color: #939393;
          margin-right: 0.11rem;
          font-size: 0.24rem;
        }
        .from{
          color: #939393;
          font-size: 0.24rem;
        }
        .m-icon{
          font-size: 0.32rem;
          line-height: 1.5;
        }
        .bouser{
          color: #ff8200;
        }
        .score{
          display: inline-block;
          height:0.32rem;
          line-height: 0.32rem;
          font-size: 0.24rem;
          background: #fcce17;
          text-align: center;
          width: 0.92rem;
          color: #fff;
          border-radius: 0.18rem;
        }
      }
    }

  }

</style>
<script>
  import Bus from '../../marvel/bus';
  export default{
    props: ['card'],
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
      jump_url:function () {
        Bus.$emit("openScheme",'sinaweibo://userinfo?uid='+this.card.user.id);
      }
    },
    components: {
      weiboIcon: require('./weibo-icon.vue')
    }
  };
</script>
