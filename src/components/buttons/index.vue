<template>
  <component :is="'btn-' + buttons[0].type" :btn="buttons[0]" :inline="inline"></component>
</template>
<script>
  export default{
    props: ['buttons', 'inline'],
    components: {
      btnLink: require('./btn-link.vue'),
      btnLike: require('./btn-like.vue'),
      btnFollow: require('./btn-follow.vue'),
      btnDefault: require('./btn-default.vue'),
    }
  };
</script>
