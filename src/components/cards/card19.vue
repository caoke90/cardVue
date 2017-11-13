<template>
  <div class="card m-panel card19">
    <div class="card-wrap">
      <div class="card-main">
        <div class="m-item-box" v-for="item in card.group">
          <div class="m-diy-btn m-box-col m-box-center m-box-center-a">
            <h3 v-if="card.mode == 1" v-html="item.item_title"></h3>
            <img :src="item.pic" v-else-if="item.pic" :alt="item.title_sub">
            <h4 v-if="card.mode == 1 && item.item_desc" v-html="item.item_desc" :style="{color: item.desc_color}"></h4>
            <h4 v-html="item.title_sub" v-if="card.mode != 1 && item.title_sub"></h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../scss/card/card19.scss";
  export default {
    name: 'card19',
    props: ['card'],
    computed: {
      col() {
        const c = Math.min(this.card.col, this.card.group.length);
        return `m-col-${c}`;
      }
    }
  };
</script>
