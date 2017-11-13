<template>
  <div class="card m-panel card4"  callback="clearUnread()">
    <div class="card-wrap">
      <div class="card-main">
        <div class="m-box">
          <div class="box-left m-box-col m-box-center-a">
            <span class="m-img-icon" v-if="card.pic">
              <img :src="card.pic">
            </span>
            <span class="main-link m-box m-box-center-a">
              <span class="main-text m-text-cut">{{card.desc}}
                <span class="m-bubble m-bubble-red-s" v-if="card.new_info"></span>
              </span>
              <span class="sub-text" v-if="card.desc_extr" v-html="card.desc_extr"></span>
              <span class="m-img-icon img-icon-b" v-if="card.avatar_url">
                <img :src="card.avatar_url">
              </span>
              <span class="m-link-icon" v-if="card.icon">
                <img :src="card.icon">
              </span>
            </span>
          </div>
          <div class="box-right m-box-center-a" v-if="card.display_arrow">
            <i class="m-font m-font-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'card4',
    props: ['card'],
    methods: {
      clearUnread() {
        this.card.new_info = 0;
        if (this.card.scheme) {
          location.href = this.card.scheme;
        }
      }
    }
  };
</script>
<style lang="scss" scoped="scoped">
  @import "../../scss/card/card4.scss";

  </style>
