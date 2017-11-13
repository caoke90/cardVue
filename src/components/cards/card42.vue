<template>
  <div class="card m-panel card42" :class="type">
    <div class="card-wrap">
      <div class="card-main">
        <div class="m-box">
          <div class="box-left m-box-col m-box-center-a">
            <span class="m-img-icon" v-if="card.pic">
              <img :src="card.pic">
            </span>
            <span class="link-text">
              <span class="main-link" v-html="card.desc"></span>
            </span>
          </div>
          <div class="box-right m-box-center-a">
            <span class="sub-link" v-if="card.title_extra_text" v-html="card.title_extra_text"></span>
            <i class="m-font m-font-arrow-right" v-if="card.display_arrow == 1"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import "../../scss/card/card42.scss";
  .card42.ctype-1 {
    &::before {
      display: none;
    }
    & .card-wrap {
      border-bottom: 0 !important;
    }
  }
</style>

<script>

  export default {
    name: 'card42',
    props: ['card'],
    computed: {
      type() {
        if (this.card.display_type) {
          return `ctype-${this.card.display_type}`;
        }
        return '';
      }
    }
  };
</script>
