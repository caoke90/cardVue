<template>
  <!--视频播放-->
  <section class="media-box">
    <div class="m-img-box" @click.stop.prevent="gotoUrl(card.card_info.big_card.player_url)">
      <mv-img :needlazy="true" :src="card.card_info.big_card.object.image.url"></mv-img>
      <div class="m-btn-round m-btn-media">
        <img src="../../assets/img/common_icon_play.png"/>
      </div>
      <div class="media-msg">
        <div class="left" v-if="card.card_info.big_card.play_count">{{card.card_info.big_card.play_count}}</div>
        <div class="right" v-if="card.card_info.big_card.object.stream">{{card.card_info.big_card.object.stream.duration | capitalize}}</div>
      </div>
    </div>
  </section>
</template>

<script>
  import Bus from '../../marvel/bus';

  export default {
    props: ["card"],
    data() {
      return {};
    },
    filters: {
      capitalize: function (value) {
        let minute = parseInt(value / 60);
        let second = parseInt(value % 60);
        second = second <= 9 ? "0" + second : second;
        return minute + ":" + second
      }
    },
    methods: {
      gotoUrl: function (url) {
        Bus.$emit("openScheme",url);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../scss/sassCore";
  @import "../../scss/var";
  //视频播放
  .media-box {
    position: relative;
    .m-img-box{
      padding-bottom: 56.25%;
      position: relative;
      background-color: #F2F2F2;
      width: 100%;
      height: auto;
      >img{
        width: 100%;
        position: absolute;
        height: 100%;
        vertical-align: top;
        object-fit: cover;
      }
    }
    .m-btn-media {
      position: absolute;
      z-index: 9;
      width: 1.28rem;
      height: 1.28rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%,-50%);
      img{
        width: 100%;
        height: 100%;
        vertical-align: top;
        object-fit: cover;
      }
    }
    .media-msg {
      z-index: 100;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      color: #FFF;
      padding-left: 0.26rem;
      padding-right: 0.26rem;
      line-height: 0.78rem;
      font-size: 0.26rem;
      background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%);

      .left{
        float: left;
      }
      .right{
        float: right;
      }
    }
  }

</style>
