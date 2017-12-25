<template>
  <div style="margin:0 auto;max-width: 750px;position: relative;">
    <div v-for="(v,k) in mainChild" :key="k">
      <mod :card="v"></mod>
    </div>
  </div>
</template>

<script>

  const app={
    data:function () {
      return {
        mainChild:require('../components/childrenList')[2].children
      };
    },
    components: {
      'mod': require('../components/mod.vue')
    },
    mounted:function () {

    }
  };

  export default app;
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>

</style>
