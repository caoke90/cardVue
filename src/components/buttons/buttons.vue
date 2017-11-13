<template>
  <component :is="'btn-' + btn.type" :btn="btn"></component>
</template>
<style scoped>
  .box-right.m-btn-box{
    width: 100%;
    margin-left: 0;
  }
</style>
<script>
  export default{
    props: ['btn'],
    components: {
      'btn-link': require('./btn-link.vue'),
      'btn-like': require('./btn-like.vue'),
      'btn-follow': require('./btn-follow.vue'),
      'btn-default': require('./btn-default.vue'),
      'btn-toolbar_menu_list'(r) {
        require(['./btn-toolbar_menu_list.vue'], r);
      },
      'btn-profile_follow'(r) {
        require(['./btn-profile_follow.vue'], r);
      },
    }
  };
</script>
