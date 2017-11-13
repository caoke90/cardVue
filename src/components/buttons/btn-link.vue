<template>
  <div :class="{'m-box-col': inline}">
    <div class="m-diy-btn m-box-col m-box-center m-box-center-a">
      <img v-if="btn.pic" :src="btn.pic" height="24" width="24">
      <h4 v-html="btn.name"></h4>
    </div>
  </div>
</template>
<script>
  export default{
    props: ['btn', 'inline'],
    data() {
      return {};
    },
  };
</script>
