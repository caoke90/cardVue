<template>
  <div class="mainEdit">
    <div class="boxcenter">

      <div v-for="(v,k) in children" v-if="v.type=='ui'" :key="v.cardId">
        <mod :card="v" contain="mainChild"></mod>
      </div>
      <div v-for="(v,k) in children" v-if="v.type!='ui'" :key="v.cardId">
        <mod :card="v" contain="mainChild"></mod>
      </div>
    </div>
  </div>

</template>

<script>

  import $ from 'jquery';
  import Bus from '../marvel/bus';
  export default{
    props:['children'],
    data:function () {
      return {
      }
    },
    components: {
      'mod': require('./modDev.vue'),
    },
    computed:{

    },
    methods: {}
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .mainEdit{
    margin: 0 auto;
    width: 575px;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    .boxcenter{
      width: 375px;height:100vh; border:1px solid rgb(221, 221, 221);margin: 0 auto;position: relative;
    }
  }
</style>
