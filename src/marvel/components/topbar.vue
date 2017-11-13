<template>
<div class="m-top-bar m-panel m-container-max m-topbar-max">
  <div class="nav-box">
    <div class="nav-left">
      <div class="nav-ctrl" v-if="back" @click="goback()"><i class="m-font m-font-arrow-left"></i>返回</div>
      <slot name="left"></slot>
    </div>
    <div class="nav-main">
      <h3 class="m-text-cut" v-text="title"></h3>
    </div>
    <div class="nav-right">
      <slot name="right"></slot>
      <div class="nav-ctrl" v-if="more" @click="gomore()"><i class="m-font m-font-dot-more"></i></div>
    </div>
  </div>
</div>
</template>
<style>
  .nav-left,.nav-right{
    z-index: 100;
  }
  .m-topbar-max {
    right: 0;
  }
</style>
<script>
  export default{
    name: 'topbar',

    props: {
      title: String,
      back: Boolean,
      more: Boolean,
      goback: {
        type: Function,
        default: function () {
          window.history.go(-1);
        }
      },
      gomore: Function,
    },
  };
</script>
