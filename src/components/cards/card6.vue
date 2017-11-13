<template>
  <div class="card m-panel card6">
    <div class="card-wrap">
      <div class="card-main" v-if="card.buttons">
        <a href="javascript:;" :class="cls">
          <btn :buttons="card.buttons" :inline="1"></btn>
        </a>
      </div>
      <div class="card-main" v-else>
        <a href="javascript:;" v-if="card.loadmore" @click="loadmore" :class="cls">{{card.desc}}
          <i class="m-font m-font-arrow-right" v-if="card.display_arrow"></i>
        </a>
        <a href="javascript:;" v-else :class="cls">{{card.desc}}
          <i class="m-font m-font-arrow-right" v-if="card.display_arrow"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'card6',
    props: ['card'],
    created() {
      if (this.card.loadmore) {
        let p = this;
        while (p) {
          if (p.card6Replace) {
            this.loadmore = p.card6Replace;
            break;
          }
          p = p.$parent;
        }
      }
    },
    methods: {
      loadmore() {
        // ..
      }
    },
    computed: {
      cls() {
        let color;
        switch (this.card.show_type) {
          case 1:
            color = 'orange';
            break;
          case 2:
            color = 'red';
            break;
          case 3:
            color = 'blue';
            break;
          default:
            color = 'gray';
        }
        return 'color-' + color;
      }
    },
    components: {
      btn: require('../buttons')
    },
  };
</script>
<style lang="scss" scoped="scoped">
  @import "../../scss/card/card6.scss";

</style>
