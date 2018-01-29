<template>
  <footer class="m-ctrl-box">
    <div class="box-center" v-if="showRt" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="repost($event, card)">
      <i class="font m-font m-font-forward" v-if="showRt"></i>
      <span v-text="card.reposts_count?card.reposts_count:'转发'">转发</span>
    </div>
    <span class="m-line-gradient"></span>
    <div class="box-center" :class="card.comment_scheme?'':'active'" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="comment($event, card)">
      <i class="font m-font m-font-comment"></i>
      <span v-text="card.comments_count?card.comments_count:'评论'">评论</span>
    </div>
    <span class="m-line-gradient"></span>
    <div class="box-center" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="like">
      <i class="font m-font m-icon" :class="{'m-icon-liked':liked,'m-icon-like':!liked}"></i>
      <span v-text="like_counts === 0 ? '赞': like_counts"></span>
    </div>
  </footer>
</template>
<style lang="scss" scoped="scoped">
  @import "../../scss/_sassCore";
  @import "../../scss/_var";
  .active {
    background-color: #ebebeb;
  }

  .m-ctrl-box {
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid;
    height: 0.69rem;
    line-height: 0.68rem;
    color: #939393;
    overflow: hidden;
    font-size: 0.26rem;
    .box-center {
      width: 33%;
      float: left;
      text-align: center;
    }
    .m-line-gradient {
      position: relative;
      float: left;
      top: 0.1rem;
      width: 0.01rem;
      min-width: 0.5px;
      background-color: #e6e6e6;
      height: 0.48rem;
      -webkit-mask: -webkit-linear-gradient(top,transparent,#000 30%,#000 70%,transparent);
    }
    .font {
      font-size: 0.34rem;
      vertical-align: -10%;
      margin-right: 0.04rem;
    }
    .m-icon{
      vertical-align: -7%;
      font-size: 0.32rem;
    }

  }
</style>
<script>
  import Bus from '../../marvel/bus';
  import qs from 'qs';
  export default {
    props: ['card'],
    data() {
      return {
        liked: false,
        like_counts: 0,
      };
    },
    created() {
      this.liked = this.card.liked;
      this.like_counts = this.card.attitudes_count;
    },
    watch: {
      'card' () {
        this.liked = this.card.liked;
        this.like_counts = this.card.attitudes_count;
      }
    },
    components: {
      weiboMedia: require('./weibo-media.vue')
    },
    computed: {
      /**
       * 是否显示转发按钮
       * @returns {boolean}
       */
      showRt() {
        return !(this.card.visible && this.card.visible.type > 0);
      }
    },
    methods: {
      touchstart: function(e) {
        if(Bus.mActive) {
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive = e.currentTarget;
        Bus.mActive.classList.add("m-active")
      },
      touchmove: function(e) {
        if(Bus.mActive) {
          Bus.mActive.classList.remove("m-active")
          Bus.mActive = null
        }
      },
      repost($event, card) { //分享
        const schemeH5 = 'sinaweibo://repost?' + qs.stringify({
          srcuid: card.user.id, //原博作者的uid
          srcid: card.mid, //原博的mid
          srcnickname: card.user.name, //原博作者的昵称。
          srctext: card.card_info.text, //原博内容
          srcprofileurl: card.user.avatar_large, //如果原博没图，这是原博主的头像url
        });
        Bus.$emit("openScheme", schemeH5);

      },
      comment($event, card) { //评论

        if(card.comment_scheme) {
          Bus.$emit("openScheme", card.comment_scheme);
        }

      },
      like: function() {
        const url = this.liked ? 'movieapp/action/like?operator=destroy' : 'movieapp/action/like?operator=add';
        let flag = true;
        let clickLike = (url) => {
          this.$http.post(url, {
            mid: this.card.id
          }).then((response) => {
            if(response.data && response.data.status == 1) {
              this.card.attitudes_count = this.like_counts;
            }
          }, (response) => {
            if(flag) {
              flag = false;
              clickLike(url); //重试
            }
            console.log(response);
          });
        }
        if(this.liked) { //点过赞
          this.like_counts -= 1;
          this.liked = false;
        } else { //没点过赞
          this.like_counts += 1;
          this.liked = true;
        };

        clickLike(url);
      }
    }
  };
</script>
