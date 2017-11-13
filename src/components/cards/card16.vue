<template>
  <div class="card m-panel card16" :class="col">
    <div class="card-wrap">
      <div class="card-main">
        <div class="m-item-box" v-for="item in card.group">
          <div class="m-diy-btn m-box-col m-box-center0 m-box-center-a">
            <btn :buttons="item.buttons" v-if="item.buttons"></btn>
            <img :src="item.pic" v-if="!item.buttons && item.pic">
            <h4 class="m-text-cut" v-html="item.title_sub" v-if="!item.buttons && item.title_sub"></h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../scss/card/card16.scss";
  export default {
    name: 'card16',
    props: ['card'],
    data() {
      return {};
    },
    computed: {
      col() {
        const c = Math.min(this.card.col || 2, this.card.group.length);
        return `m-col-${c}`;
      }
    },
    components: {
      btn: require('../buttons')
    },
  };
</script>
