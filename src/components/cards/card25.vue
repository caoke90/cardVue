<template>
  <div class="card m-panel card25 m-avatar-box" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)">
    <div class="card-wrap">
      <div class="card-main">
        <div class="m-box">
          <div class="m-img-box" @click="openUrl(card.scheme)">
            <mv-img :needlazy="true" :src="card.user_profile_pic"></mv-img>
            <i class="m-icon" :class='"m-icon-"+card.user_verified_color+"v"' v-if="card.user_verified_color"></i>
          </div>
          <div class="m-box-col m-box-dir m-box-center">
            <div class="m-text-box" @click="openUrl(card.scheme)">
              <h3 class="m-text-cut" v-text="card.user_name"></h3>
              <h4 class="m-text-cut" v-text="card.desc1"></h4>
              <h4 class="m-text-cut" v-text="card.desc2"></h4>
            </div>
          </div>
          <div class="box-right m-box-center-a m-box-center m-btn-box" v-if="card.button" @touchstart.stop="touchstart($event)">
						<span class="m-add-box" v-if="card.button.sub_type==0" @click="addFollow(card.button)">
							<i class="m-font m-font-follow"></i>
							<h4>加关注</h4>
						</span>
            <span class="m-add-box m-add-al" v-else>
							<i class="m-font m-font-follow"></i>
							<h4>已关注</h4>
						</span>
          </div>
        </div>
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
    name: "card25",
    props: ['card'],
    components: {
    },
    methods: {
      touchstart:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive=e.currentTarget;
        Bus.mActive.classList.add("m-active")

      },
      touchmove:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
          Bus.mActive=null
        }
      },
      addFollow:function (button) {
        button.sub_type=1;
        this.$http.post(button.params.callback_url).then(function (resp) {
          if(resp.data&&resp.data.status==1){
          }else{
            button.sub_type=0;
          }
        },function () {
          button.sub_type=0;
        })
      },
      openUrl:function (url) {
        if(url){
          Bus.$emit("openScheme",url);
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  /*处理头像圆角 icsize控制处理不同设备的V标适配*/
  .m-avatar-box .m-img-box {
    border-radius: 50%;
    position: relative; }
  .m-avatar-box .m-img-box::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 50%; }

  .m-avatar-box .m-img-box img {
    border-radius: 50%; }
  .m-avatar-box .m-img-box .m-icon {
    position: absolute;
    z-index: 3;
    right: -0.02rem;
    bottom: -0.02rem; }
  .m-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .m-add-box {
    color: #FF8200;
    text-align: center;
    display: inline-block;
  }
  .m-add-box .m-font {
    color: #FF8200;
    font-size: 0.56rem;
  }
  .m-add-box h4 {
    font-size: 0.2rem;
  }
  .m-add-box.m-add-al {
    color: #939393; }
  .m-add-box.m-add-al .m-font {
    color: #939393; }
  .m-add-box.m-add-each {
    color: #10B524; }
  .m-add-box.m-add-each .m-font {
    color: #10B524; }

</style>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>

    .card25 .card-wrap .card-main {
    margin: 0;
    padding: 0.2rem 0; }

  .card25 .m-img-box {
    width: 1.4rem;
    height: 1.4rem;
    margin: 0 0.2rem 0 0; }
  .card25 .m-img-box .m-icon {
    font-size: 16px; }
  @media screen and (min-width: 414px) and (max-width: 767px) {
    .card25 .m-img-box .m-icon {
      font-size: 17px; } }
  @media screen and (min-width: 768px) {
    .card25 .m-img-box .m-icon {
      font-size: 0.32rem; } }

</style>
