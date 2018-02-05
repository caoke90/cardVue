<template>
  <weibo :card="card.weibo_info" v-if="card.weibo_info.mid"></weibo>
</template>
<script>
  import Vue from 'vue';
  import Bus from '../../marvel/bus';
  //添加依赖的公共组件
  import model from '../../marvel/components/pswp';
  Bus.addModalComponent(model)

  Vue.use(require('@/filters'));

  //查看大图
  Bus.$on("moviePic", function(index, list) {
    Bus.$emit('mvGallery', index, list);
  });
  export default {
    data() {
      return {};
    },
    name: "card9",
    props: ['card'],
    components: {
      weibo:require("../weibo/weibo.vue")
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >

</style>
