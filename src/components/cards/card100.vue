<template>
  <other :card="card.weibo_info"></other>
</template>
<script>
  import Bus from '../../marvel/bus';
  //添加依赖的公共组件
  import model from '../../marvel/components/file';
  Bus.addModalComponent(model);
  export default {
    data() {
      return {};
    },
    name: "card100",
    props: ['card'],
    components: {
      other:require("../other/weibo.vue")
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >

</style>
